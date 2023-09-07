import { useState } from 'react';
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
      theme.colorScheme === 'dark' ? undefined : theme.colors.gray[2],
  },
  link: {
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

    const link = (
      <a
        className={classes.link}
        target={'_blank'}
        rel={'noreferrer'}
        href={UrlMtPelerin.url}
      >
        {UrlMtPelerin.keyword}
        {
          <IconExternalLink
            size={14}
            color={colors.brand[9]}
            className={classes.imageLink}
          />
        }
      </a>
    );

    return (
      <p key={key}>
        {subTexts.map((subText, j) => {
          return (
            <>
              {j > 0 && link}
              {formatContactUs(subText)}
            </>
          );
        })}

        {/* {newText} {i == 2 && MtPelerinLink()} */}
      </p>
    );
  }

  function formatContactUs(text: string): JSX.Element {
    const subTexts = text.split(t(UrlContactUs.keyword));

    const link = (
      <a
        className={classes.link}
        target={'_blank'}
        rel={'noreferrer'}
        href={UrlContactUs.url}
      >
        {t(UrlContactUs.keyword)}
        <IconExternalLink
          size={14}
          color={colors.brand[9]}
          className={classes.imageLink}
        />
      </a>
    );

    return (
      <>
        {subTexts.map((subText, j) => {
          return (
            <>
              {j > 0 && link}
              {subText}
            </>
          );
        })}
      </>
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
