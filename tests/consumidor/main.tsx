import { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { OpInputTexto, type OpInputTextoProps } from '@mathvsk/obraprima-ui';
import '@mathvsk/obraprima-ui/estilos.css';

const props: OpInputTextoProps = {
  id: 'nome',
  label: 'Nome',
  value: 'Obra Prima',
  onChange: (valor: string) => console.log(valor),
  ref: createRef<HTMLInputElement>(),
};

const raiz = document.getElementById('root');
if (!raiz) throw new Error('Raiz ausente.');
createRoot(raiz).render(<OpInputTexto {...props} />);
