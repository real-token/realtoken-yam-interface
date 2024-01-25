import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@mantine/core';
import { useRole } from 'src/hooks/useRole';
import { isRole, USER_ROLE } from 'src/types/admin';
import classes from './HeaderNav.module.css';
import { useRouter } from 'next/router';

export const HeaderNav: FC = () => {
  const { t } = useTranslation('header');
  const router = useRouter();

  const colorSelected = '#cfaa70';

  const { role } = useRole();

  return (
      <Flex className={classes.container} gap={100} justify={'center'}>
        <Text
          size={'xl'}
          fw={700}
          className={classes.link}
          c={router.pathname === '/' ? colorSelected : ''}
          onClick={() => router.push('/')}
        >
          {t('titleCat1')}
        </Text>
        <Text
          size={'xl'}
          fw={700}
          className={classes.link}
          c={router.pathname === '/my-offers' ? colorSelected : ''}
          onClick={() => router.push('/my-offers')}
        >
          {t('titleCat2')}
        </Text>
        { isRole(role,[USER_ROLE.MODERATOR,USER_ROLE.ADMIN]) ? 
          <Text
            size={'xl'}
            fw={700}
            className={classes.link}
            c={router.pathname === '/admin' ? colorSelected : ''}
            onClick={() => router.push('/admin')}
          >
            {t('titleAdmin')}
          </Text>
            :
            undefined
        }
    </Flex>
  );
};
