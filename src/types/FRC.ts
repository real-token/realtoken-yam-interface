import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type FRC<T, R> = ForwardRefExoticComponent<T & RefAttributes<R>>;