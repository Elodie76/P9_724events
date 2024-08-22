import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });

it("pauses the slider when space key is pressed", async () => {
  window.console.error = jest.fn();
  api.loadData = jest.fn().mockReturnValue(data);
  render(
    <DataProvider>
      <Slider />
    </DataProvider>
  );

  // Simulate space key press
  fireEvent.keyDown(window, { key: " ", code: "Space" });

  // Check if the slider is paused
  // You can add a data-testid to the Slider component to check the paused state
  const slider = screen.getByTestId("slider");
  expect(slider).toHaveAttribute("data-paused", "true");

  // Simulate space key press again to resume
  fireEvent.keyDown(window, { key: " ", code: "Space" });

  // Check if the slider is resumed
  expect(slider).toHaveAttribute("data-paused", "false");
});
});

