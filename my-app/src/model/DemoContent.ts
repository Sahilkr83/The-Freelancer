// models/DemoContent.ts
import { Schema, Document, model, models } from "mongoose";

type Style = {

  color: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
};

type TextContent = {
  text: string;
  style: Style;
};

type FeatureService = {
  title: TextContent;
  description: TextContent;
};

export interface IDemoContent extends Document {
  heroTitle: TextContent;
  heroSubtitle: TextContent;
  features: FeatureService[];
  services: FeatureService[];
  about: TextContent;
  contact: TextContent;
}

const styleSchema = new Schema<Style>({
  color: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontWeight: { type: String, required: true },
  fontStyle: { type: String, required: true },
},{ _id: false } );

const textContentSchema = new Schema<TextContent>({
  text: { type: String, required: true },
  style: { type: styleSchema, required: true },
},{ _id: false } );

const featureServiceSchema = new Schema<FeatureService>({
  title: { type: textContentSchema, required: true },
  description: { type: textContentSchema, required: true },
},{ _id: false });

const demoContentSchema = new Schema<IDemoContent>({
  heroTitle: { type: textContentSchema, required: true },
  heroSubtitle: { type: textContentSchema, required: true },
  features: { type: [featureServiceSchema], default: [] },
  services: { type: [featureServiceSchema], default: [] },
  about: { type: textContentSchema, required: true },
  contact: { type: textContentSchema, required: true },
});

const DemoContent = models.DemoContent || model<IDemoContent>("DemoContent", demoContentSchema);

export default DemoContent;
