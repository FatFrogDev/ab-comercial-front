import './Landing.css';

function Landing() {
return (
    <>
    <div className="reveal-wrapper">
      <img src=".\src\assets\Imagologo_motion.svg" id="imagologo"/>
        <main className="content">
          <img src="/static/images/Telefono-01.png" alt="logo" id="main-image"/>
          <section className="text">
              <h1>BIENVENIDO A</h1>
              <h2>MONITORING INNOVATION</h2>
          </section>
        </main>
      <div className="reveal-wrapper"></div>
      <div className="reveal"></div>
      

    </div>
    <footer>
        <a href="https://monitoringinnovation.com/">MONITORINGINNOVATION</a>
        <a href="https://gpscontrol.co/">GPS CONTROL</a>
        <a href="https://github.com/FatFrogDev/ab-comercial-front">Link repo front</a>
        <a href="https://github.com/FatFrogDev/ab-comercial">Link repo back</a>
    </footer>
    </>
  )
}

export default Landing