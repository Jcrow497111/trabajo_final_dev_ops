interface Props {
  mensaje: string
  onConfirmar: () => void
  onCancelar: () => void
}

export default function ConfirmDialog({ mensaje, onConfirmar, onCancelar }: Props) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <p>{mensaje}</p>
        <div className="form-actions">
          <button className="btn btn-danger" onClick={onConfirmar}>
            Eliminar
          </button>
          <button className="btn btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
