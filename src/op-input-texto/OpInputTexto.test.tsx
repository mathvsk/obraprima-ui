import { createRef } from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { OpInputTextoProps } from './OpInputTexto.interface.js';
import { OpInputTexto } from './OpInputTexto.js';

function renderizar(props: Partial<OpInputTextoProps> = {}) {
  const onChange = vi.fn();
  render(<OpInputTexto id="cli-nome" label="Nome" value="" onChange={onChange} {...props} />);
  const campo = screen.getByLabelText('Nome');
  return { onChange, campo };
}

describe('OpInputTexto (docs/referencia/op-input-texto.md)', () => {
  it('o rótulo identifica o campo de texto', () => {
    const { campo } = renderizar();

    expect(campo).toHaveAttribute('id', 'cli-nome');
    expect(campo).toHaveAttribute('type', 'text');
  });

  it('mostra o valor recebido', () => {
    const { campo } = renderizar({ value: 'Construtora Alfa' });

    expect(campo).toHaveValue('Construtora Alfa');
  });

  it('digitar chama onChange com o novo valor', async () => {
    const usuario = userEvent.setup();
    const { onChange, campo } = renderizar({ value: 'An' });

    await usuario.type(campo, 'a');

    expect(onChange).toHaveBeenCalledWith('Ana');
  });

  it('o erro fica associado ao campo', () => {
    const { campo } = renderizar({ error: 'Informe o nome.' });

    expect(campo).toHaveAttribute('aria-invalid', 'true');
    expect(campo).toHaveAccessibleDescription('Informe o nome.');
  });

  it('sem erro, o campo não fica inválido nem descrito', () => {
    const { campo } = renderizar();

    expect(campo).not.toHaveAttribute('aria-invalid');
    expect(campo).not.toHaveAttribute('aria-describedby');
  });

  it('desabilitado impede edição', async () => {
    const usuario = userEvent.setup();
    const { onChange, campo } = renderizar({ disabled: true });

    await usuario.type(campo, 'Ana');

    expect(campo).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('a referência permite focar o campo', () => {
    const referencia = createRef<HTMLInputElement>();
    const { campo } = renderizar({ ref: referencia });

    act(() => referencia.current?.focus());

    expect(campo).toHaveFocus();
  });

  it('repassa placeholder e limite de caracteres', () => {
    const { campo } = renderizar({ placeholder: 'Nome completo', maxLength: 100 });

    expect(campo).toHaveAttribute('placeholder', 'Nome completo');
    expect(campo).toHaveAttribute('maxlength', '100');
  });

  it('não marca o campo como obrigatório: a regra continua na tela', () => {
    const { campo } = renderizar({ error: 'Informe o nome.' });

    expect(campo).not.toBeRequired();
  });
});
