import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// export const create = mutation({
//   args: { order: v.array(v.union(v.number(),v.null())) },
//   handler: async (ctx, args) => {
//     const cardId = await ctx.db.insert("Order", { order: args.order });
//     return cardId
//   },
// });
export const generateUrl = mutation({
    args: {},
    handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
}  });

export const get =  query({
  args: { },
  handler: async (ctx) => {
    const imgs = await ctx.db.query("Images").collect()

    return Promise.all(
        imgs.map(async (img) => ({
          ...img,
          // If the message is an "image" its `body` is an `Id<"_storage">`
          ...(
             { url: await ctx.storage.getUrl(img.url) })}
            
        )),
      );
  },
});

export const store = mutation({
    args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
     
        await ctx.db.insert("Images",{url:args.storageId })
     
    },
  });

  export const del = mutation({
    args: {
      storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
      return await ctx.storage.delete(args.storageId);
    },
  });
