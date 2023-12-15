import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { styles } from './Header.styles';
import { useRouter } from 'next/router';
import { useRole } from 'src/hooks/useRole';
import { isRole, USER_ROLE } from 'src/types/admin';

export const HeaderNav: FC = () => {
  const { t } = useTranslation('header');
  const router = useRouter()
  const colorSelected = '#cfaa70';

  const { role } = useRole();

  return (
      <Flex sx={styles.container} gap={100} justify={'center'}>
        <Text
          size={'xl'}
          weight={700}
          component={NextLink}
          href={'/'}
          color={router.pathname === '/' ? colorSelected : ''}
        >
          {t('titleCat1')}
        </Text>
        <Text
          size={'xl'}
          weight={700}
          component={NextLink}
          href={'/my-offers'}
          color={router.pathname === '/my-offers' ? colorSelected : ''}
        >
          {t('titleCat2')}
        </Text>
        { isRole(role,[USER_ROLE.MODERATOR,USER_ROLE.ADMIN]) ? 
            <Text
            size={'xl'}
            weight={700}
            component={NextLink}
            href={'/admin'}
            color={router.pathname === '/admin' ? colorSelected : ''}
          >
            {t('titleAdmin')}
          </Text>
            :
            undefined
        }
    </Flex>
  );
};
