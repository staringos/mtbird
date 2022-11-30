import Qrcode from '../../assets/images/new-qrcode.jpg';

const Contact = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <img src={Qrcode} width={200} />
        <p style={{ textAlign: 'center' }}>
          <strong>加入开源社群（备注：社群）</strong>
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <img src={Qrcode} width={200} />
        <p style={{ textAlign: 'center' }}>
          <strong>商务和技术支持</strong>
        </p>
      </div>
    </div>
  );
};

export default Contact;
