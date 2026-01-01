# 📝 Système de Logging

## 🎯 Vue d'ensemble

Le système de logging permet de contrôler la verbosité des logs via une variable d'environnement `LOG_LEVEL`. Il est conçu pour être extensible et facilement configurable.

## 🚀 Utilisation

### Import du logger

```typescript
// Logger par défaut (sans préfixe)
import { logger } from '@/utils/logger';
logger.info('Message d\'information');
logger.error('Message d\'erreur');

// Logger avec préfixe (recommandé pour identifier le module)
import { createLogger } from '@/utils/logger';
const apiLogger = createLogger('API');
apiLogger.info('Requête reçue'); // [INFO][API] Requête reçue
```

### Niveaux de log disponibles

1. **`error`** : Erreurs critiques (toujours affiché)
2. **`info`** : Informations importantes (affiché par défaut)
3. **`log`** : Logs généraux (nécessite `LOG_LEVEL=log` ou supérieur)
4. **`debug`** : Logs de débogage détaillés (nécessite `LOG_LEVEL=debug`)

### Exemples d'utilisation

```typescript
import { createLogger } from '@/utils/logger';

const logger = createLogger('MonModule');

// Erreur (toujours affiché)
logger.error('Une erreur est survenue', error);

// Information (affiché par défaut)
logger.info('Opération réussie');

// Log général (nécessite LOG_LEVEL=log ou debug)
logger.log('Détails de l\'opération', { data });

// Debug (nécessite LOG_LEVEL=debug)
logger.debug('État interne', { state, variables });
```

## ⚙️ Configuration

### Variable d'environnement `LOG_LEVEL`

Le système supporte **deux formats** pour une flexibilité maximale :

#### Format 1 : Sélection précise par liste (recommandé) 🎯

Sélectionnez exactement les niveaux que vous voulez afficher, séparés par des virgules :

```bash
# Affiche uniquement error (toujours) + info
LOG_LEVEL=info

# Affiche error (toujours) + debug (sans info ni log)
LOG_LEVEL=debug

# Affiche error (toujours) + info + debug (sans log)
LOG_LEVEL=info,debug

# Affiche error (toujours) + log + debug (sans info)
LOG_LEVEL=log,debug

# Affiche tous les niveaux sauf log
LOG_LEVEL=info,debug

# Affiche tous les niveaux
LOG_LEVEL=info,log,debug
```

#### Format 2 : Mode hiérarchie (compatibilité) 📊

Un seul niveau active tous les niveaux inférieurs (compatibilité avec l'ancien système) :

```bash
# Affiche error (toujours) + info + log
LOG_LEVEL=log

# Affiche tous les niveaux (error + info + log + debug)
LOG_LEVEL=debug
```

### Comportement par défaut

Si `LOG_LEVEL` n'est **pas défini** ou est **vide** :
- ✅ `error` : **toujours affiché** (même si non spécifié)
- ✅ `info` : affiché
- ❌ `log` : masqué
- ❌ `debug` : masqué

### Règle importante : ERROR toujours affiché

⚠️ **Le niveau `error` est TOUJOURS affiché**, même s'il n'est pas dans la liste `LOG_LEVEL`. C'est une sécurité pour ne jamais masquer les erreurs critiques.

## 🔧 Extension du système

### Ajouter un nouveau niveau de log

L'ajout d'un nouveau niveau est simple et ne nécessite que 3 étapes :

1. **Ajouter le niveau dans l'enum** `LogLevel` :

```typescript
export enum LogLevel {
  ERROR = 'error',
  INFO = 'info',
  LOG = 'log',
  DEBUG = 'debug',
  TRACE = 'trace', // Nouveau niveau
}
```

2. **Ajouter dans la hiérarchie** `LOG_LEVEL_HIERARCHY` (pour le mode hiérarchie) :

```typescript
const LOG_LEVEL_HIERARCHY: Record<LogLevel, number> = {
  [LogLevel.ERROR]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.LOG]: 2,
  [LogLevel.DEBUG]: 3,
  [LogLevel.TRACE]: 4, // Nouveau niveau
};
```

3. **Ajouter la méthode dans la classe `Logger` et l'interface `ILogger`** :

```typescript
// Dans l'interface ILogger
export interface ILogger {
  error(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  log(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
  trace(message: string, ...args: any[]): void; // Nouveau niveau
}

// Dans la classe Logger
trace(message: string, ...args: any[]): void {
  if (shouldLog(LogLevel.TRACE)) {
    const formattedMessage = formatMessage(LogLevel.TRACE, this.prefix, message);
    console.trace(formattedMessage, ...args);
  }
}
```

**C'est tout !** Le nouveau niveau sera automatiquement disponible dans les deux modes :
- Mode sélection : `LOG_LEVEL=info,trace`
- Mode hiérarchie : `LOG_LEVEL=trace` (affichera tous les niveaux jusqu'à trace)

## 📋 Migration depuis console.log

### Avant

```typescript
console.log('[API] Requête reçue');
console.error('[API] Erreur:', error);
```

### Après

```typescript
import { createLogger } from '@/utils/logger';

const logger = createLogger('API');
logger.log('Requête reçue'); // Nécessite LOG_LEVEL=log ou supérieur
logger.error('Erreur:', error); // Toujours affiché
```

## 🎨 Format des messages

Les messages sont automatiquement formatés avec :
- Le niveau de log en majuscules : `[ERROR]`, `[INFO]`, `[LOG]`, `[DEBUG]`
- Le préfixe du logger (si défini) : `[MonModule]`
- Le message original

**Exemple de sortie :**
```
[INFO][API] Requête reçue
[ERROR][API] Erreur: Network error
[DEBUG][API] État interne: { data: {...} }
```

## ⚠️ Notes importantes

1. **Côté serveur uniquement** : Les variables d'environnement `process.env` sont disponibles côté serveur Next.js. Pour le client, utilisez `NEXT_PUBLIC_*`.

2. **Performance** : Les messages sont filtrés **avant** d'être passés à `console.*`, donc il n'y a pas de surcoût si le niveau est désactivé.

3. **TypeScript** : Le système est entièrement typé pour une meilleure expérience de développement.
