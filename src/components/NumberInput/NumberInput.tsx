import { forwardRef, useRef } from 'react';

import {
  Button,
  ButtonProps,
  NumberInput as MantineInput,
  NumberInputProps as MantineNumberInputProps,
  NumberInputHandlers,
  Flex,
  Loader,
  StyleProp,
  MantineSpacing
} from '@mantine/core';

import { FRC } from 'src/types';
import { SetFieldValue } from '@mantine/form/lib/types';

export const truncDigits = (inputNumber: number, digits: number): number => {
  const fact = 10 ** digits;
  return Math.floor(inputNumber * fact) / fact;
}

type NumberInputProps = {
  showMax?: boolean | undefined;
  showMin?: boolean | undefined;
  controlsProps?: ButtonProps;
  groupMarginBottom?: StyleProp<MantineSpacing>;
  setFieldValue?: SetFieldValue<any>;
  width?: string;
} & MantineNumberInputProps;

export const NumberInput: FRC<NumberInputProps, HTMLInputElement> = forwardRef(
  ({ disabled, showMin, showMax, controlsProps, groupMarginBottom, setFieldValue, width, ...props }, ref) => {
    const handlers = useRef<NumberInputHandlers>();

    const setMax = () => {
      if(!props.max) return;
      const max = truncDigits(props.max,6);
      if(setFieldValue) setFieldValue("amount",max);
    }

    return (
      <Flex gap={5} align={'flex-end'} mb={groupMarginBottom ?? 0}>
        <MantineInput
          hideControls={true}
          handlersRef={handlers}
          decimalScale={6}
          disabled={disabled}
          {...props}
          ref={ref}
        />
        {showMin && (
          <Button
            aria-label={'Min'}
            variant={'light'}
            disabled={disabled}
            onClick={() => handlers.current?.decrement()}
            {...controlsProps}
          >
            {'Min'}
          </Button>
        )}
        {showMax && (
          <Button
            aria-label={'Max'}
            variant={'light'}
            disabled={disabled}
            onClick={() => setMax()}
            {...controlsProps}
          >
            {props.max == undefined ? <Loader size={"xs"}/> : 'Max'}
          </Button>
        )}
      </Flex>
    );
  }
);
NumberInput.displayName = 'NumberInput';
