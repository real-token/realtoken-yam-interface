import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@mantine/core';
import { useRole } from 'src/hooks/useRole';
import { isRole, USER_ROLE } from 'src/types/admin';
import classes from './HeaderNav.module.css';
import { useNavigate, useLocation } from '@tanstack/react-router';

export const HeaderNav: FC = () => {
  const { t } = useTranslation('header');
  const navigate = useNavigate();
  const location = useLocation();

  const colorSelected = '#cfaa70';

  const { role } = useRole();

  return (
      <Flex className={classes.container} gap={100} justify={'center'}>
        <Text
          size={'xl'}
          fw={700}
          className={classes.link}
          c={location.pathname === '/' ? colorSelected : ''}
          onClick={() => navigate({ to: '/' })}
        >
          {t('titleCat1')}
        </Text>
        <Text
          size={'xl'}
          fw={700}
          className={classes.link}
          c={location.pathname === '/my-offers' ? colorSelected : ''}
          onClick={() => navigate({ to: '/my-offers' })}
        >
          {t('titleCat2')}
        </Text>
        <Text
          size={'xl'}
          fw={700}
          className={classes.link}
          c={location.pathname === '/historic' ? colorSelected : ''}
          onClick={() => navigate({ to: '/historic' })}
        >
          {t('historic')}
        </Text>
        { isRole(role,[USER_ROLE.MODERATOR,USER_ROLE.ADMIN]) ?
          <Text
            size={'xl'}
            fw={700}
            className={classes.link}
            c={location.pathname === '/admin' ? colorSelected : ''}
            onClick={() => navigate({ to: '/admin' })}
          >
            {t('titleAdmin')}
          </Text>
            :
            undefined
        }
    </Flex>
  );
};
