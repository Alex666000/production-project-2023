import {HTMLAttributes, memo, ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light'

export type CardPadding = '0' | '8' | '16' | '24'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    withoutPadding?: boolean;
    padding?: CardPadding
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max,
        padding = '8',
        ...otherProps
    } = props;

    // смапить пропс - своиство в класс  в качестве ключа CardPadding - а в качестве
    // значения непосредственно сам класс
    const mapPaddingToClass: Record<CardPadding, string> = {
        '0': 'gap_0',
        '8': 'gap_8',
        '16': 'gap_16',
        '24': 'gap_24',
    };

    // отдельно класс делаем которыи отвечает за пединги - и с помощью объекта как
    // ключ значение он у нас смапится
    // затем передаем его как адиншл класс как дополнительный...
    const paddingClass = mapPaddingToClass[padding];


    return (
        <div
            className={classNames(cls.Card, {
                [cls.max]: max,
            }, [className, cls[variant], cls[paddingClass]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
