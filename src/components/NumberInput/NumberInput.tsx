import { forwardRef, useRef } from 'react';

import {
  Button,
  ButtonProps,
  Group,
  NumberInput as MantineInput,
  NumberInputProps as MantineNumberInputProps,
  NumberInputHandlers,
} from '@mantine/core';

import { FRC } from 'src/types';

type NumberInputProps = {
  showMax?: boolean | undefined;
  showMin?: boolean | undefined;
  controlsProps?: ButtonProps;
} & MantineNumberInputProps;

export const NumberInput: FRC<NumberInputProps, HTMLInputElement> = forwardRef(
  ({ disabled, showMin, showMax, controlsProps, ...props }, ref) => {
    const handlers = useRef<NumberInputHandlers>();

    return (
      <Group spacing={5} align={'flex-end'}>
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
            onClick={() => handlers.current?.increment()}
            {...controlsProps}
          >
            {'Max'}
          </Button>
        )}
      </Group>
    );
  }
);
NumberInput.displayName = 'NumberInput';
