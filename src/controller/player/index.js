import playersModel from "../../model/players/index.js";

const playerController = {
  getAll: async (req, res) => {
    try {
      const players = await playersModel.findAll();
      players.sort((a, b) => {
        let sumA = a.goals + a.assists + a.motm;
        let sumB = b.goals + b.assists + b.motm;
        return sumB - sumA;
      });

      res.status(200).json({ message: "Here are the players", players });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  post: async (req, res) => {
    try {
      const payload = req.body;
      const player = await playersModel.create({
        name: payload.name,
        goals: payload.goals,
        assists: payload.assists,
        position: payload.position,
        motm: payload.motm,
        TeamId: payload.teamId,

        // name: payload.playerName,
        // goals: payload.goals,
        // assists: payload.assists,
        // position: payload.position,
        // motm: payload.motm,
        // TeamId: payload.teamName
      });

      res.status(200).json({ message: "Player Created", player });
    } catch (error) {
      console.log("console", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const player = await playersModel.findOne({ where: { id } });

      if (!player) {
        return res.status(400).json({ message: "Player Not Found" });
      }

      await player.destroy();
      res.status(200).json({ message: "Player Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default playerController;
