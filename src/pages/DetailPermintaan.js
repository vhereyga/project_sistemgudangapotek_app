import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailPermintaan.css';

const DetailPermintaan = () => {
  const navigate = useNavigate();
  const [isApproved, setIsApproved] = useState(null);

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleDecline = () => {
    setIsApproved(false);
  };

  const handleCloseModal = () => {
    setIsApproved(null);
  };

  const handleHomeClick = () => {
    navigate('/index');
};

  const gotoDetailPemesanan = () => {
    navigate('/DetailPemesanan');
  };

  return (
    <div className="detail-permintaan-container">
      <div className="home-button">
          <button onClick={handleHomeClick}>🏠 Home</button>
     </div>
      <div className="header">KONFIRMASI PERMINTAAN PEMBELIAN</div>

      <div className="request-card">
        <div className="request-text">Permintaan Pembayaran stok obat baru</div>
        <button className="detail-button" onClick={gotoDetailPemesanan}>
          Detail Pemesanan
        </button>
        <div className="action-buttons">
          <button className="approve-button" onClick={handleApprove}>Setuju</button>
          <button className="decline-button" onClick={handleDecline}>Tidak Setuju</button>
        </div>
      </div>

      {/* Modal for approval or decline confirmation */}
      {isApproved !== null && (
        <div className="modal">
          <div className="modal-content">
            <p>{isApproved ? "Permintaan Disetujui!" : "Permintaan Tidak Disetujui!"}</p>
            <button className="close-button" onClick={handleCloseModal}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPermintaan;
