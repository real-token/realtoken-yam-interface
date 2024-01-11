import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@mantine/core';
import { useRole } from 'src/hooks/useRole';
import { isRole, USER_ROLE } from 'src/types/admin';
import classes from './HeaderNav.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const HeaderNav: FC = () => {
  const { t } = useTranslation('header');
  const router = useRouter()
  const colorSelected = '#cfaa70';

  const { role } = useRole();

  return (
      <Flex className={classes.container} gap={100} justify={'center'}>
        <Text
          size={'xl'}
          fw={700}
          component={Link}
          href={'/'}
          c={router.pathname === '/' ? colorSelected : ''}
        >
          {t('titleCat1')}
        </Text>
        <Text
          size={'xl'}
          fw={700}
          component={Link}
          href={'/my-offers'}
          c={router.pathname === '/my-offers' ? colorSelected : ''}
        >
          {t('titleCat2')}
        </Text>
        { isRole(role,[USER_ROLE.MODERATOR,USER_ROLE.ADMIN]) ? 
          <Text
            size={'xl'}
            fw={700}
            component={Link}
            href={'/admin'}
            c={router.pathname === '/admin' ? colorSelected : ''}
          >
            {t('titleAdmin')}
          </Text>
            :
            undefined
        }
    </Flex>
  );
};
