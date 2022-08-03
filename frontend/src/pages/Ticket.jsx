import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { closeTicket, getTicket } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Ticket = () => {
  const { ticket, isError, isLoading, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();
  // console.log(ticketId);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  //Close Ticket
  const handleClick = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>
          Product: &nbsp;
          <span
            className={
              ticket.status === "closed" ? `product-closed` : `product`
            }
          >
            {ticket.product}
          </span>
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button onClick={handleClick} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
