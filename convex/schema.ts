import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Order: defineTable({
    order: v.array(v.union(v.string(),v.null())),

  }),
  Images: defineTable({ url: v.string() }),

  
});