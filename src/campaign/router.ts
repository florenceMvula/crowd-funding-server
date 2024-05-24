import { Router } from "express";
import { CampaignCollection } from "./collection";

const campaignRouter = Router();
const campaignCollection = new CampaignCollection();

campaignRouter.post("/create",campaignCollection.CreateCampaign);
campaignRouter.get("/get-campaigns",campaignCollection.GetAllCampaigns);
campaignRouter.get("/get/:id",campaignCollection.GetCampaignById);
// campaignRouter.get("/get-campaign-by-userid/:userid",campaignCollection.GetCampaignByUserId)

export default campaignRouter;