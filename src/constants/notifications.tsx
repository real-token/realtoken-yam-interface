import { Translation } from 'react-i18next';

import { Anchor, Stack, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { NotificationProps } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

import { asConst, shortenString } from 'src/utils';

export enum NotificationsID {
  userCopied = 'userCopied',
  usersNotFound = 'usersNotFound',
  createOfferLoading = 'createOfferLoading',
  createOfferSuccess = 'createOfferSuccess',
  createOfferError = 'createOfferError',
  buyOfferLoading = 'buyOfferLoading',
  buyOfferSuccess = 'buyOfferSuccess',
  buyOfferError = 'buyOfferError',
}

export const NOTIFICATIONS = asConst<
  Record<
    NotificationsID,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NotificationProps | ((payload: any) => NotificationProps)
  >
>()({
  [NotificationsID.userCopied]: {
    id: 'user-copied',
    color: 'teal',
    icon: <IconCheck size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('userCopied.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => t('userCopied.message')}
      </Translation>
    ),
  },
  [NotificationsID.usersNotFound]: {
    id: 'users-not-found',
    color: 'red',
    icon: <IconX size={16} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('usersNotFound.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => t('usersNotFound.message')}
      </Translation>
    ),
  },
  [NotificationsID.createOfferLoading]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `create-offer-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('createOfferLoading.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('createOfferLoading.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.createOfferSuccess]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `create-offer-${payload.key}`,
    color: 'teal',
    icon: <IconCheck size={16} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('createOfferSuccess.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('createOfferSuccess.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.createOfferError]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `create-offer-${payload.key}`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('createOfferError.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('createOfferError.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.buyOfferLoading]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `create-offer-${payload.key}`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('buyOfferLoading.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('buyOfferLoading.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.buyOfferSuccess]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `create-offer-${payload.key}`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('buyOfferSuccess.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('buyOfferSuccess.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.buyOfferError]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `create-offer-${payload.key}`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('buyOfferError.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('buyOfferError.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
});
