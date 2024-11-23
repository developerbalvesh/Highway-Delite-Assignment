import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  getAllNotesResp,
  regularResponse,
} from "../interfaces/interfaces";
import axios from "axios";
const ManageNote = () => {
  const [note, setNote] = useState<string>();
  const [url, setUrl] = useState<string>(import.meta.env.VITE_SERVER);
  const [notes, setNotes] = useState([]);
  //   const user = useAppSelector((state) => state.user);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<regularResponse>(url + "/note/create", {
        note,
      });

      if (data.success) {
        setNote("");
        toast.success(data.message);
        getAllNotes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
    }
  };

  const getAllNotes = async () => {
    try {
      const { data } = await axios.get<getAllNotesResp>(url + "/note/all");
      if (data.success) {
        setNotes(data.notes);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal error");
    }
  };

  const deleteNote = async (_id: string) => {
    const { data } = await axios.delete<regularResponse>(
      url + "/note/delete/" + _id
    );

    if (data.success) {
      toast.success(data.message);
      getAllNotes();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (import.meta.env.VITE_SERVER) {
      setUrl(import.meta.env.VITE_SERVER);
    }
    getAllNotes();
  }, []);

  return (
    <div>
      <ToastContainer />
      <button
        type="button"
        className="btn btn-primary w-100 rounded-round py-2 fw-bold"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create Note
      </button>

      <div className=" my-3">
        <h5>Notes</h5>
        {notes?.map((n: { note: string; _id: string }) => (
          <div
            key={n._id}
            className="shadow note my-2 rounded-round justify-content-between p-3 align-items-center d-flex"
          >
            <p className="m-0">{n.note}</p>
            <i
              onClick={() => deleteNote(n._id)}
              className="fa-solid fa-trash-can cursor-pointer"
            ></i>
          </div>
        ))}
        {!notes.length && (
            <>
            <div
            className="shadow note my-2 rounded-round justify-content-between p-3 align-items-center d-flex"
          >
            <p className="m-0">No notes found !</p>
          </div>
            </>
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
                <label>
                  <input
                    type="text"
                    required
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <span>Enter note</span>
                </label>
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  className="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNote;
