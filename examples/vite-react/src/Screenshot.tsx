import screenshot from './assets/homepage.png'

function Screenshot() {
  return (
    <div>
      <h1>I'm up-to-date screenshot</h1>
      <img style={{ maxWidth: '100%'}} src={screenshot} />
    </div>
  )
}

export default Screenshot;
