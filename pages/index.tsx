import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NextPage } from 'next';

import {
  Flex,
  Notification,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';

import Display from 'src/components/Display/Display';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { UrlContactUs, UrlMtPelerin } from 'src/constants';
import { ConnectedProvider } from 'src/providers/ConnectProvider';

const useStyle = createStyles((theme) => ({
  notification: {
    marginBottom: '16px',
    backgroundColor:
      theme.colorScheme === 'dark' ? undefined : theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
  },
  text: {
    fontSize: theme.fontSizes.md,
  },
  link: {
    fontSize: theme.fontSizes.md,
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderBottomColor: 'transparent',
    color: theme.colors.brand,
    textDecoration: 'none',
    '&:hover': {
      color: theme.colors.brand,
      borderBottomColor: theme.colors.brand,
      cursor: 'pointer',
    },
  },
  imageLink: {
    marginLeft: '2px',
    marginBottom: '-1px',
    alignItems: 'end',
  },
}));

const HomePage: NextPage = () => {
  const { classes } = useStyle();
  const { t } = useTranslation('notifications', { keyPrefix: 'kycRequired' });
  const [isNotificationClosed, setIsNotificationClosed] =
    useState<boolean>(false);
  const { colors } = useMantineTheme();

  function formatParagraphe(text: string, key: number): JSX.Element {
    const subTexts = text.split(UrlMtPelerin.keyword);

    return (
      <p key={'p' + key} className={classes.text}>
        {subTexts.map((subText, j) => {
          const baseKey = key * 100 + j;
          return (
            <React.Fragment key={'F' + baseKey}>
              {j > 0 && link(baseKey)}
              {formatContactUs(subText, baseKey)}
            </React.Fragment>
          );
        })}

        {/* {newText} {i == 2 && MtPelerinLink()} */}
      </p>
    );

    function link(key: number) {
      return (
        <a
          className={classes.link}
          target={'_blank'}
          rel={'noreferrer'}
          href={UrlMtPelerin.url}
          key={'aPelerin' + key}
        >
          {UrlMtPelerin.keyword}
          {
            <IconExternalLink
              key={'Pelerin' + key}
              size={14}
              color={colors.brand[9]}
              className={classes.imageLink}
            />
          }
        </a>
      );
    }
  }

  function formatContactUs(text: string, key: number): JSX.Element {
    const subTexts = text.split(t(UrlContactUs.keyword));

    function link(j: number) {
      return (
        <a
          className={classes.link}
          target={'_blank'}
          rel={'noreferrer'}
          href={UrlContactUs.url}
          key={'aPelerin' + key + 'contact' + j}
        >
          {t(UrlContactUs.keyword)}
          <IconExternalLink
            key={'Pelerin' + key + 'contact' + j}
            size={14}
            color={colors.brand[9]}
            className={classes.imageLink}
          />
        </a>
      );
    }

    return (
      <React.Fragment key={'FC' + key}>
        {subTexts.map((subText, j) => {
          return (
            <React.Fragment key={'FC' + key + j}>
              {j > 0 && link(j)}
              {subText}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <ConnectedProvider>
      <Flex my={'xl'} direction={'column'}>
        {!isNotificationClosed && (
          <Notification
            className={classes.notification}
            color={'yellow'}
            title={t('title')}
            onClose={() => {
              setIsNotificationClosed(() => true);
            }}
          >
            {t('message')
              .split('\n')
              .map(function (text, i): JSX.Element {
                return formatParagraphe(text, i);
              })}
          </Notification>
        )}
        <MarketTableFilter />
        <Display />
      </Flex>
    </ConnectedProvider>
  );
};

export default HomePage;
