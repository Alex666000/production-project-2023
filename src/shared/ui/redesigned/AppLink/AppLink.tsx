import { LinkProps, NavLink } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassName = '',
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [activeClassName]: isActive }, [
                    className,
                    cls[variant],
                ])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});

// import { DetailedHTMLProps, HTMLAttributes, ReactNode, forwardRef } from 'react'
// import { cn } from '@/utils/merge-cn'
//
// // types
// export type FlexJustifyContent =
//   | 'center'
//   | 'end'
//   | 'spaceAround'
//   | 'spaceBetween'
//   | 'spaceEvenly'
//   | 'start'
//
// export type FlexAlignItems = 'center' | 'end' | 'start'
// export type FlexDirection = 'column' | 'row'
// export type FlexWrap = 'nowrap' | 'wrap'
// export type FlexGap = '8' | '10' | '20' | '30' | '40' | '50'
//
// // mapping types + classes
// const justifyClasses: Record<FlexJustifyContent, string> = {
//   center: 'justify-center',
//   end: 'justify-end',
//   spaceAround: 'justify-around',
//   spaceBetween: 'justify-between',
//   spaceEvenly: 'justify-evenly',
//   start: 'justify-start',
// }
//
// const alignClasses: Record<FlexAlignItems, string> = {
//   center: 'items-center',
//   end: 'items-end',
//   start: 'items-start',
// }
//
// const directionClasses: Record<FlexDirection, string> = {
//   column: 'flex flex-col',
//   row: 'flex flex-row',
// }
//
// const gapClasses: Record<FlexGap, string> = {
//   8: 'gap-[8px]',
//   10: 'gap-[10px]',
//   20: 'gap-[20px]',
//   30: 'gap-[30px]',
//   40: 'gap-[40px]',
//   50: 'gap-[50px]',
// }
//
// // props
// type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
//
// export interface FlexProps extends DivProps {
//   /**
//    * Выравнивание флекс элементов
//    */
//   align?: FlexAlignItems
//   children: ReactNode
//   className?: string
//   flexDirection?: FlexDirection
//   gap?: FlexGap
//   justify?: FlexJustifyContent
//   /**
//    * Растягивает Flex контейнер на всю ширину
//    */
//   maxWidth?: boolean
//   wrap?: FlexWrap
// }
//
// const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
//   const {
//     align = 'center',
//     children,
//     className,
//     flexDirection = 'row',
//     gap,
//     justify = 'start',
//     maxWidth,
//     wrap = 'nowrap',
//     ...flexProps
//   } = props
//
//   const classes = [
//     className,
//     justifyClasses[justify],
//     alignClasses[align],
//     directionClasses[flexDirection],
//     'flex-wrap',
//     gap && gapClasses[gap],
//   ]
//
//   return (
//     <div ref={ref} className={cn('flex', maxWidth && 'w-full', classes)} {...flexProps}>
//       {children}
//     </div>
//   )
// })
//
// Flex.displayName = 'Flex'
// export { Flex }

// import { ComponentPropsWithoutRef, CSSProperties, ElementType, forwardRef, ReactNode } from 'react'
// import { clsx } from 'clsx'
//
// export type TextColor = 'warning' | 'error' | 'info' | 'primary' | 'success' | 'lightDark' | 'dark'
// export type TextAlign = 'right' | 'left' | 'center'
//
// export type TextProps<T extends ElementType = 'span'> = {
//   /**
//    * Пример использования с props "as": Текст будет ссылкой:
//    * <Text as={Link} to={ROUTES.profile} variant="subtitle1" className={s.name}>Привет!</Text>
//    */
//   as?: T
//   align?: TextAlign
//   textColor?: TextColor
//   variant?:
//     | 'Large' // 26px;
//     | 'H1' // 20px;
//     | 'H2' // 18px;
//     | 'H3' // 16px;
//     | 'regular_text_16' // 16px - BASE FONT;
//     | 'bold_text_16'
//     | 'regular_text_14'
//     | 'medium_text_14'
//     | 'bold_text_14'
//     | 'small_text_12'
//     | 'semi-bold_small_text_12'
//     | 'regular-link_14'
//     | 'small-link_14'
//     | 'error_text_12'
//     | 'muted_text'
//     | 'inline_code'
//   children: ReactNode
//   cssStyleColors?: CSSProperties['color']
// } & ComponentPropsWithoutRef<T>
//
// const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
//   const {
//     as: Comp = 'span',
//     className,
//     /**
//      * Задаёт шрифт + размер + межстрочный интервал текста
//      */
//     variant = 'regular_text_16',
//     textColor = 'primary',
//     /**
//      * style - для передачи цвета текста пропсом при отрисовки компонента Text
//      * Пример использования: <Text variant={'Large'} style={{color: "green"}}>Some text</Text>
//      */
//     style,
//     /**
//      * Выравнивание текста
//      */
//     align,
//     children,
//     cssStyleColors,
//     ...textProps
//   } = props
//
//   /**
//    "Мерж" классов тайлвинд:
//    */
//   const textClasses = clsx(
//     variant === 'Large' && `text-3xl-large-26`,
//     variant === 'H1' && `text-xl-H1-20`,
//     variant === 'H2' && `text-lg-H2-18`,
//     variant === 'H3' && `text-base-H3-16`,
//     variant === 'regular_text_16' && `text-main-reg-16`,
//     variant === 'muted_text' && `text-md text-muted-foreground`,
//     variant === 'bold_text_16' && `text-md-bold-16`,
//     variant === 'regular_text_14' && `text-sm-reg-14`,
//     variant === 'medium_text_14' && `text-sm-medium-14`,
//     variant === 'bold_text_14' && `text-sm-bold-14`,
//     variant === 'bold_text_14' && `text-sm-bold-14`,
//     variant === 'regular-link_14' && `text-sm-reg-link-14`,
//     variant === 'small-link_14' && `text-xs-link-12`,
//     variant === 'error_text_12' && `text-xs-small-12 text-Danger-500`,
//     /**
//      * Текст с "фоновой" обводкой
//      */
//     variant === 'inline_code' && `text-xs-small-12 text-Danger-500`,
//
//     textColor === 'primary' && `text-Light-100`,
//     textColor === 'warning' && `text-Warning-500`,
//     textColor === 'error' && `text-Danger-500`,
//     textColor === 'info' && `text-Primary-100`,
//     textColor === 'success' && `text-Success-500`,
//     textColor === 'success' && `text-Success-500`,
//     textColor === 'lightDark' && `text-Dark-100`,
//     textColor === 'dark' && `text-Success-900`,
//
//     align === 'center' && `text-center`,
//     align === 'left' && `text-left`,
//     align === 'right' && `text-right`,
//     className
//   )
//
//   const styles = {
//     ...(cssStyleColors && { color: cssStyleColors }),
//     ...style,
//   }
//
//   return (
//     <>
//       {variant === 'inline_code' ? (
//         <code className="relative rounded bg-Light-900/90 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
//           {children}
//         </code>
//       ) : (
//         <Comp ref={ref} className={textClasses} style={styles} {...textProps}>
//           {children}
//         </Comp>
//       )}
//     </>
//   )
// })
//
// Text.displayName = 'Flex'
// export { Text }
