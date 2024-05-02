import axios from "axios";

function ModalDeleteElement({
  setModalDeleteOpener,
  lecturerId,
}: {
  setModalDeleteOpener: (arg0: boolean) => void;
  lecturerId: string;
}) {
  const deleteElement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/lecturers/${lecturerId}`)
      .then(() => {})
      .catch((error) => {
        console.error("Error deleting lecturer:", error);
      })
      .finally(() => {
        setModalDeleteOpener(false);
      });
  };

  return (
    <div
      className="modalContainer"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modalContainer") {
          setModalDeleteOpener(false);
        }
      }}
    >
      <form onSubmit={deleteElement}>
        <div className="modal">
          <div className="close" onClick={() => setModalDeleteOpener(false)}>
            <p>x</p>
          </div>
          <div className="modalHeader">Izbriši</div>
          <div className="modalInputElements">
            <button type="submit">Da</button>
            <button onClick={() => setModalDeleteOpener(false)}>Ne</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalDeleteElement;
