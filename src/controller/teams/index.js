import teamModel from "../../model/teams/index.js";

const teamController = {
  getAll: async (req, res) => {
    try {
      const teams = await teamModel.findAll({
        include: 'Players'
      });
      teams.sort((a, b) => a.division.localeCompare(b.division) || a.name.localeCompare(b.name))

      res.status(200).json({ message: "All Teams", teams });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  post: async (req, res) => {
    try {
      const payload = req.body;
      const team = await teamModel.create({
        name: payload.name,
        division: payload.division,
      });

      res.status(200).json({ message: "Team Created", team });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const team = await teamModel.findOne({ where: { id } });

      if (!team) {
        return res.status(400).json({ message: "No team found" });
      }

      await team.destroy();

      res.status(200).json({ message: "Team Deleted Succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default teamController;