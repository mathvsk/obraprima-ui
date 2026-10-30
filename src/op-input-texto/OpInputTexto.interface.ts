import type { ChangeEvent, Ref } from 'react';

export interface OpInputTextoProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly maxLength?: number;
  readonly ref?: Ref<HTMLInputElement>;
}

export interface OpInputTextoLogica {
  readonly temErro: boolean;
  readonly idDoErro: string;
  readonly aoAlterar: (evento: ChangeEvent<HTMLInputElement>) => void;
}
