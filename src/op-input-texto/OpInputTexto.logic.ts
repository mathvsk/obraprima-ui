import type { ChangeEvent } from 'react';
import type { OpInputTextoLogica, OpInputTextoProps } from './OpInputTexto.interface.js';

export function useOpInputTexto({ id, error, onChange }: OpInputTextoProps): OpInputTextoLogica {
  const temErro = Boolean(error);
  const idDoErro = `${id}-erro`;
  const aoAlterar = (evento: ChangeEvent<HTMLInputElement>) => onChange(evento.target.value);

  return { temErro, idDoErro, aoAlterar };
}
