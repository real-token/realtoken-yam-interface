import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@mantine/core';
//import { NextLink } from '@mantine/next';
import { styles } from './Header.styles';
import { useRouter } from 'next/router';
import { useRole } from 'src/hooks/useRole';
import { isRole, USER_ROLE } from 'src/types/admin';
import Link from 'next/link';

export const HeaderNav: FC = () => {
  const { t } = useTranslation('header');
  const router = useRouter();
  const colorSelected = '#606e0c';

  const { role } = useRole();

  return (
    <Flex sx={styles.container} gap={100}>
      <Text
        size={'xl'}
        weight={700}
        component={Link}
        href={'/'}
        color={router.pathname === '/' ? colorSelected : ''}
      >
        {t('titleCat1')}
      </Text>
      <Text
        size={'xl'}
        weight={700}
        component={Link}
        href={'/my-offers'}
        color={router.pathname === '/my-offers' ? colorSelected : ''}
      >
        {t('titleCat2')}
      </Text>
      <Text
        size={'xl'}
        weight={700}
        component={Link}
        href={
          'https://cleansat-mining.gitbook.io/gitbook-cleansat-mining#le-marche-secondaire-yam'
        }
        target={'_blank'}
      >
        {t('titleHelp')}
      </Text>
      {isRole(role, [USER_ROLE.MODERATOR, USER_ROLE.ADMIN]) ? (
        <Text
          size={'xl'}
          weight={700}
          component={Link}
          href={'/admin'}
          color={router.pathname === '/admin' ? colorSelected : ''}
        >
          {t('titleAdmin')}
        </Text>
      ) : undefined}
    </Flex>
  );
};
