import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { OpInputTextoProps } from './OpInputTexto.interface.js';
import { OpInputTexto } from './OpInputTexto.js';

const meta = {
  title: 'Campos/op-input-texto',
  component: OpInputTexto,
  args: {
    id: 'cli-nome',
    label: 'Nome',
    value: '',
    onChange: fn(),
  },
  render: function Render(args) {
    const [, atualizarArgs] = useArgs<OpInputTextoProps>();
    const onChange = (value: string) => {
      atualizarArgs({ value });
      args.onChange(value);
    };

    return <OpInputTexto {...args} onChange={onChange} />;
  },
} satisfies Meta<typeof OpInputTexto>;

export default meta;

type Historia = StoryObj<typeof meta>;

export const Vazio: Historia = {};

export const Preenchido: Historia = {
  args: { value: 'Maria Souza' },
};

export const ComPlaceholder: Historia = {
  args: { placeholder: 'Nome completo' },
};

export const Foco: Historia = {
  play: async ({ canvas }) => {
    const campo = await canvas.findByLabelText('Nome');
    campo.focus();
  },
};

export const ComErro: Historia = {
  args: { error: 'Informe o nome.' },
};

export const Desabilitado: Historia = {
  args: { value: 'Maria Souza', disabled: true },
};
