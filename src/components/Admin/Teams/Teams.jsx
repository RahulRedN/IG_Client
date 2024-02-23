import Teams_Card from "./Teams_Card"

function Teams() {
  return (
    <div>
        <h1>Teams</h1>
        <div className="flex  flex-wrap gap-10 justify-center py-6">
        <Teams_Card />
        <Teams_Card />
        <Teams_Card />
        <Teams_Card />
        <Teams_Card />
        </div>
    </div>
  )
}

export default Teams