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
  approveOfferLoading = 'approveOfferLoading',
  approveOfferSuccess = 'approveOfferSuccess',
  approveOfferError = 'approveOfferError',
  updateOfferLoading = 'updateOfferLoading',
  updateOfferSuccess = 'updateOfferSuccess',
  updateOfferError = 'updateOfferError',
  deleteOfferLoading = 'deleteOfferLoading',
  deleteOfferSuccess = 'deleteOfferSuccess',
  deleteOfferError = 'deleteOfferError',
  createOfferInvalid = 'createOfferInvalid',
  buyOfferInvalid = 'buyOfferInvalid',

  grantRoleLoading = "grantRoleLoading",
  grantRoleSuccess = "grantRoleSuccess",
  grantRoleInvalid = "grantRoleInvalid",
}

export const NOTIFICATIONS = asConst<
  Record<
    NotificationsID,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NotificationProps | ((payload: any) => NotificationProps)
  >
>()({
  [NotificationsID.grantRoleLoading]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `grant-role-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('grantRoleLoading.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('grantRoleLoading.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.grantRoleSuccess]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `grant-role-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('grantRoleSuccess.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('grantRoleSuccess.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.grantRoleInvalid]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `grant-role-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('grantRoleInvalid.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('grantRoleInvalid.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
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
    id: `buy-offer-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
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
    id: `buy-offer-${payload.key}`,
    color: 'teal',
    icon: <IconCheck size={16} />,
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
    id: `buy-offer-${payload.key}`,
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
  [NotificationsID.approveOfferLoading]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `approve-offer-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('approveOfferLoading.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('approveOfferLoading.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.approveOfferSuccess]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `approve-offer-${payload.key}`,
    color: 'teal',
    icon: <IconCheck size={16} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('approveOfferSuccess.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('approveOfferSuccess.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.approveOfferError]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `approve-offer-${payload.key}`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('approveOfferError.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('approveOfferError.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.updateOfferLoading]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `update-offer-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('updateOfferLoading.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('updateOfferLoading.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.updateOfferSuccess]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `update-offer-${payload.key}`,
    color: 'teal',
    icon: <IconCheck size={16} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('updateOfferSuccess.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('updateOfferSuccess.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.updateOfferError]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `update-offer-${payload.key}`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('updateOfferError.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('updateOfferError.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.deleteOfferLoading]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `delete-offer-${payload.key}`,
    loading: true,
    autoClose: false,
    disallowClose: true,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('deleteOfferLoading.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('deleteOfferLoading.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.deleteOfferSuccess]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `delete-offer-${payload.key}`,
    color: 'teal',
    icon: <IconCheck size={16} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('deleteOfferSuccess.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('deleteOfferSuccess.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.deleteOfferError]: (payload: {
    key: string;
    hash: string;
    href: string;
  }) => ({
    id: `delete-offer-${payload.key}`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('deleteOfferError.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>
            {`${t('deleteOfferError.message')}`}
            <Anchor component={NextLink} href={payload.href} target={'_blank'}>
              <Text>{`(${shortenString(payload.hash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ),
  }),
  [NotificationsID.createOfferInvalid]: () => ({
    id: `create-offer-invalid`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('createOfferInvalid.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => (
          <Stack spacing={1}>{`${t('createOfferInvalid.message')}`}</Stack>
        )}
      </Translation>
    ),
  }),

  [NotificationsID.buyOfferInvalid]: () => ({
    id: `buy-offer-invalid`,
    color: 'red',
    icon: <IconX size={14} />,
    title: (
      <Translation ns={'notifications'}>
        {(t) => t('buyOfferInvalid.title')}
      </Translation>
    ),
    message: (
      <Translation ns={'notifications'}>
        {(t) => <Stack spacing={1}>{`${t('buyOfferInvalid.message')}`}</Stack>}
      </Translation>
    ),
  }),
});
