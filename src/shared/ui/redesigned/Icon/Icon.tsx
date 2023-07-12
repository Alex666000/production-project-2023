import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

    type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

// интерфейс для некликабельных иконок
interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}
// интерфейс для кликабельных иконок
interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    // индикатор говорит что кнопка кликабельна
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
