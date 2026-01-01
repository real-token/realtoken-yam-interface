import { createLogger } from './logger';
const logger = createLogger('src/utils/logger');

/**
 * Système de logging extensible avec gestion des niveaux via variable d'environnement
 *
 * Niveaux disponibles :
 * - error : Erreurs critiques (TOUJOURS affiché, même si non spécifié)
 * - warn : Avertissements (affiché par défaut)
 * - info : Informations importantes
 * - log : Logs généraux
 * - debug : Logs de débogage détaillés
 *
 * Configuration via variable d'environnement LOG_LEVEL :
 *
 * Format 1 : Liste séparée par des virgules (recommandé)
 * - LOG_LEVEL=info,debug  → affiche error (toujours) + info + debug
 * - LOG_LEVEL=log         → affiche error (toujours) + log
 * - LOG_LEVEL=info,log,debug → affiche error (toujours) + info + log + debug
 *
 * Format 2 : Compatibilité avec l'ancien système (un seul niveau)
 * - LOG_LEVEL=log  → affiche error (toujours) + info + log (hiérarchie)
 * - LOG_LEVEL=debug → affiche tous les niveaux (error + info + log + debug)
 *
 * Par défaut (si non défini ou vide) : error + info uniquement
 *
 * Architecture extensible : ajouter de nouveaux niveaux dans l'enum LogLevel
 * et les inclure dans la liste LOG_LEVEL pour les activer.
 */

/**
 * Enum des niveaux de log disponibles
 * Ordre d'importance : error < warn < info < log < debug
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  LOG = 'log',
  DEBUG = 'debug',
}

/**
 * Hiérarchie des niveaux de log (ordre croissant de verbosité)
 */
export const LOG_LEVEL_HIERARCHY: Record<LogLevel, number> = {
  [LogLevel.ERROR]: 0,
  [LogLevel.WARN]: 1,
  [LogLevel.INFO]: 2,
  [LogLevel.LOG]: 3,
  [LogLevel.DEBUG]: 4,
};

/**
 * Niveaux par défaut (quand LOG_LEVEL n'est pas défini)
 */
export const DEFAULT_LEVELS: LogLevel[] = [LogLevel.ERROR, LogLevel.INFO];

/**
 * Cache des niveaux activés (pour éviter de re-parser à chaque appel)
 */
let cachedEnabledLevels: Set<LogLevel> | null = null;

/**
 * Parse la variable d'environnement LOG_LEVEL
 * Supporte deux formats :
 * 1. Liste séparée par virgules : "info,debug" ou "info,log,debug"
 * 2. Un seul niveau (compatibilité) : "log" ou "debug"
 *
 * @returns Set des niveaux activés (toujours inclut ERROR)
 */
function getEnabledLogLevels(): Set<LogLevel> {
  // Utiliser le cache si disponible
  if (cachedEnabledLevels !== null) {
    return cachedEnabledLevels;
  }

  const envLevel = process.env.LOG_LEVEL?.toLowerCase().trim();
  const enabledLevels = new Set<LogLevel>();

  // ERROR est toujours activé
  enabledLevels.add(LogLevel.ERROR);

  // Si LOG_LEVEL n'est pas défini, utiliser les niveaux par défaut
  if (!envLevel) {
    enabledLevels.add(LogLevel.INFO);
    cachedEnabledLevels = enabledLevels;
    return enabledLevels;
  }

  // Parser la valeur : peut être une liste séparée par des virgules ou un seul niveau
  const levels = envLevel.split(',').map((l) => l.trim().toLowerCase());
  const validLevels = Object.values(LogLevel);

  // Mode 1 : Un seul niveau → Mode hiérarchie (compatibilité avec l'ancien système)
  if (levels.length === 1) {
    const levelStr = levels[0];
    if (validLevels.includes(levelStr as LogLevel)) {
      // Mode hiérarchie : activer tous les niveaux jusqu'au niveau spécifié
      const targetLevel = levelStr as LogLevel;
      const targetLevelValue = LOG_LEVEL_HIERARCHY[targetLevel];

      for (const [level, value] of Object.entries(LOG_LEVEL_HIERARCHY)) {
        if (value <= targetLevelValue) {
          enabledLevels.add(level as LogLevel);
        }
      }
    } else {
      // Niveau invalide, utiliser les défauts
      logger.warn(
        `[Logger] Niveau de log invalide "${levelStr}". Niveaux valides: ${validLevels.join(
          ', '
        )}. Utilisation du niveau par défaut.`
      );
      enabledLevels.add(LogLevel.INFO);
    }
  } else {
    // Mode 2 : Plusieurs niveaux → Mode sélection précise
    let hasValidLevel = false;

    for (const levelStr of levels) {
      if (validLevels.includes(levelStr as LogLevel)) {
        enabledLevels.add(levelStr as LogLevel);
        hasValidLevel = true;
      } else {
        // Niveau invalide dans une liste, l'ignorer avec un avertissement
        logger.warn(
          `[Logger] Niveau de log invalide "${levelStr}" ignoré. Niveaux valides: ${validLevels.join(
            ', '
          )}.`
        );
      }
    }

    // Si aucun niveau valide n'a été trouvé (sauf ERROR qui est toujours là), utiliser les défauts
    if (!hasValidLevel) {
      enabledLevels.add(LogLevel.INFO);
    }
  }

  // Mettre en cache
  cachedEnabledLevels = enabledLevels;
  return enabledLevels;
}

/**
 * Détermine si un niveau de log doit être affiché
 * @param level Le niveau de log à vérifier
 * @returns true si le niveau doit être affiché, false sinon
 */
function shouldLog(level: LogLevel): boolean {
  // ERROR est toujours affiché
  if (level === LogLevel.ERROR) {
    return true;
  }

  const enabledLevels = getEnabledLogLevels();
  return enabledLevels.has(level);
}

/**
 * Formate le message de log avec un préfixe
 * @param level Le niveau de log
 * @param prefix Le préfixe optionnel (ex: nom du module)
 * @param message Le message à logger
 * @returns Le message formaté
 */
function formatMessage(
  level: LogLevel,
  prefix: string | undefined,
  message: string
): string {
  const levelPrefix = `[${level.toUpperCase()}]`;
  const prefixStr = prefix ? `[${prefix}]` : '';
  return `${levelPrefix}${prefixStr} ${message}`;
}

/**
 * Interface du logger
 */
export interface ILogger {
  error(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  log(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

/**
 * Classe Logger principale
 */
class Logger implements ILogger {
  private prefix?: string;

  /**
   * Crée une instance de Logger
   * @param prefix Préfixe optionnel pour identifier le module/context (ex: 'API', 'Auth', etc.)
   */
  constructor(prefix?: string) {
    this.prefix = prefix;
  }

  /**
   * Log une erreur (toujours affiché)
   */
  error(message: string, ...args: any[]): void {
    if (shouldLog(LogLevel.ERROR)) {
      const formattedMessage = formatMessage(
        LogLevel.ERROR,
        this.prefix,
        message
      );
      logger.error(formattedMessage, ...args);
    }
  }

  /**
   * Log un avertissement (affiché par défaut)
   */
  warn(message: string, ...args: any[]): void {
    if (shouldLog(LogLevel.WARN)) {
      const formattedMessage = formatMessage(
        LogLevel.WARN,
        this.prefix,
        message
      );
      logger.warn(formattedMessage, ...args);
    }
  }

  /**
   * Log une information (affiché par défaut)
   */
  info(message: string, ...args: any[]): void {
    if (shouldLog(LogLevel.INFO)) {
      const formattedMessage = formatMessage(
        LogLevel.INFO,
        this.prefix,
        message
      );
      logger.info(formattedMessage, ...args);
    }
  }

  /**
   * Log un message général (nécessite LOG_LEVEL=log ou supérieur)
   */
  log(message: string, ...args: any[]): void {
    if (shouldLog(LogLevel.LOG)) {
      const formattedMessage = formatMessage(
        LogLevel.LOG,
        this.prefix,
        message
      );
      logger.debug(formattedMessage, ...args);
    }
  }

  /**
   * Log un message de débogage (nécessite LOG_LEVEL=debug)
   */
  debug(message: string, ...args: any[]): void {
    if (shouldLog(LogLevel.DEBUG)) {
      const formattedMessage = formatMessage(
        LogLevel.DEBUG,
        this.prefix,
        message
      );
      logger.debug(formattedMessage, ...args);
    }
  }
}

/**
 * Instance par défaut du logger (sans préfixe)
 */
export const logger = new Logger();

/**
 * Factory pour créer un logger avec un préfixe
 * @param prefix Le préfixe pour identifier le module/context
 * @returns Une instance de Logger avec le préfixe
 *
 * @example
 * const apiLogger = createLogger('API');
 * apiLogger.info('Requête reçue'); // [INFO][API] Requête reçue
 */
export function createLogger(prefix: string): ILogger {
  return new Logger(prefix);
}

/**
 * Réinitialise le cache des niveaux activés (utile pour les tests)
 * @internal
 */
export function resetLogLevelCache(): void {
  cachedEnabledLevels = null;
}

/**
 * Export des types et utilitaires pour extension future
 * Note: LogLevel est déjà exporté dans sa déclaration enum
 */
