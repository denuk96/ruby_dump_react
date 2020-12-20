import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideErrors, hideNotices } from "../../ducks/message";

export default function Message() {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.messageReducer.errors);
  const notices = useSelector((state) => state.messageReducer.notices);

  const closeError = () => dispatch(hideErrors);
  const closeNotice = () => dispatch(hideNotices);

  return (
    <div>
      {errors && errors.length > 0 ? (
        <div className="alert alert-warning" role="alert">
          {errors.join()}
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeError.bind(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        ""
      )}

      {notices && notices.length > 0 ? (
        <div className="alert alert-primary" role="alert">
          {notices.join()}
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeNotice.bind(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
