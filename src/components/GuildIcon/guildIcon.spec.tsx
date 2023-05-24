import React from "react";
import { render } from "@testing-library/react-native";
import GuildIcon from ".";
import { ReactTestInstance } from "react-test-renderer";

describe("Component GuildIcon", () => {
  it("should be render correctly", () => {
    const { getByTestId } = render(<GuildIcon guildId={"1"} iconId={null} />);
    expect(getByTestId("guildIcon")).toBeTruthy();
  });

  it("should be render correctly icon Discord with iconId null", () => {
    const { getByTestId } = render(<GuildIcon guildId={"1"} iconId={null} />);

    const guildIcon = getByTestId("guildIcon");
    const discordSvg = guildIcon.children[0] as ReactTestInstance;

    expect(discordSvg.type).toBe("discord.svg");
  });

  it("should be render correctly icon with iconId not null", () => {
    const { getByTestId } = render(<GuildIcon guildId={"1"} iconId={"1"} />);
    const { CDN_IMAGE } = process.env;
    const guildIcon = getByTestId("guildIcon");
    const image = guildIcon.children[0] as ReactTestInstance;
    // console.log("image", image.props.source.uri);

    expect(image.type).not.toBe("discord.svg");
    // const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    expect(image.props.source.uri).toBe(`${CDN_IMAGE}/icons/1/1.png`);
  });
});
