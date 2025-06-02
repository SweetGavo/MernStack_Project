import React, { useState } from "react";
import axios from "axios";
import "../../styles/makeTransfer.css";

interface TransferForm {
  senderAccount: string;
  receiverAccount: string;
  amount: string;
  transferDescription: string;
}

const MakeTransfer = () => {
  const [form, setForm] = useState<TransferForm>({
    senderAccount: "",
    receiverAccount: "",
    amount: "",
    transferDescription: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/transactions/transfer",
        form,
        {
          withCredentials: true,
        },
      );
      setMessage({
        text: res.data.message || "Transfer successful!",
        type: "success",
      });
      setForm({
        senderAccount: "",
        receiverAccount: "",
        amount: "",
        transferDescription: "",
      });
    } catch (err: any) {
      setMessage({
        text:
          err.response?.data?.message || "Transfer failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="transfer-container">
      <div className="transfer-card">
        <h2 className="transfer-title">Make a Transfer</h2>

        <form onSubmit={handleSubmit} className="transfer-form">
          <div className="form-group">
            <label htmlFor="senderAccount">From Account</label>
            <input
              id="senderAccount"
              name="senderAccount"
              type="text"
              placeholder="Enter your account number"
              value={form.senderAccount}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="receiverAccount">To Account</label>
            <input
              id="receiverAccount"
              name="receiverAccount"
              type="text"
              placeholder="Enter recipient account number"
              value={form.receiverAccount}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount (₦)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="transferDescription">Description (Optional)</label>
            <input
              id="transferDescription"
              name="transferDescription"
              type="text"
              placeholder="e.g. Monthly rent payment"
              value={form.transferDescription}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            className="transfer-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              "Transfer Money"
            )}
          </button>
        </form>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </div>
    </div>
  );
};

export default MakeTransfer;
