import { useState } from "react";
import { useSelector } from "react-redux";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Costumer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Costumer Email</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="MacBook Pro">MacBook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
