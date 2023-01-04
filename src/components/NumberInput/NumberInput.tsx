import { forwardRef, useRef } from 'react';

import {
  Button,
  ButtonProps,
  NumberInput as MantineInput,
  NumberInputProps as MantineNumberInputProps,
  NumberInputHandlers,
  MantineNumberSize,
  Flex,
  Loader,
} from '@mantine/core';

import { FRC } from 'src/types';
import { SetFieldValue } from '@mantine/form/lib/types';

type NumberInputProps = {
  showMax?: boolean | undefined;
  showMin?: boolean | undefined;
  controlsProps?: ButtonProps;
  groupMarginBottom: MantineNumberSize;
  setFieldValue: SetFieldValue<unknown>
} & MantineNumberInputProps;

export const NumberInput: FRC<NumberInputProps, HTMLInputElement> = forwardRef(
  ({ disabled, showMin, showMax, controlsProps, groupMarginBottom, setFieldValue, ...props }, ref) => {
    const handlers = useRef<NumberInputHandlers>();
    return (
      <Flex gap={5} align={'flex-end'} mb={groupMarginBottom ?? 0}>
        <MantineInput
          hideControls={true}
          handlersRef={handlers}
          precision={6}
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
            onClick={() => setFieldValue("amount",Number(props.max))}
            {...controlsProps}
          >
            {!props.max ? <Loader size={"xs"}/> : 'Max'}
          </Button>
        )}
      </Flex>
    );
  }
);
NumberInput.displayName = 'NumberInput';
