module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      keywords: []
    },
    { timestamps: false }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Thing = mongoose.model("thing", schema);
  return Thing;
};
