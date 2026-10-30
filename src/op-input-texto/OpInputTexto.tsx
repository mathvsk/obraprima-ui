import type { OpInputTextoProps } from './OpInputTexto.interface.js';
import { useOpInputTexto } from './OpInputTexto.logic.js';

export function OpInputTexto(props: OpInputTextoProps) {
  const { id, label, value, placeholder, disabled, error, maxLength, ref } = props;
  const { temErro, idDoErro, aoAlterar } = useOpInputTexto(props);

  return (
    <div className="op-input-texto">
      <label className="op-input-texto__rotulo" htmlFor={id}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className="op-input-texto__campo"
        type="text"
        value={value}
        onChange={aoAlterar}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        aria-invalid={temErro ? true : undefined}
        aria-describedby={temErro ? idDoErro : undefined}
      />
      {temErro && (
        <p className="op-input-texto__erro" id={idDoErro}>
          {error}
        </p>
      )}
    </div>
  );
}
