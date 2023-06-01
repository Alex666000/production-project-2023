import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
    // компонент из вне будет получать дополнительный класс (поправить отступы или изменить размеры чтобы...)
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
      <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                  <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
                        Главная
                  </AppLink>
                  <AppLink theme={AppLinkTheme.RED} to="/about">
                        О сайте
                  </AppLink>
            </div>
      </div>
);
