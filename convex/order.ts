import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { order: v.array(v.union(v.string(),v.null())) },
  handler: async (ctx, args) => {
    const cardId = await ctx.db.insert("Order", { order: args.order });
    return cardId
  },
});

export const get =  query({
  args: { id: v.id("Order") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id)

    return order
  },
});