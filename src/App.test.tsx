import { render, screen, waitFor } from "@testing-library/react";
import { Dashboard } from "./components/Dashboard";
import { DataTable } from "./components/DataTable";
import usersMock from "./mocked.json";

test("renders learn react link", async () => {
  render(<Dashboard />);
  const ButtonElement = screen.getByText(/Create Item/i);
  await waitFor(() => {
    expect(ButtonElement).toBeInTheDocument();
  });
});

describe("data table", () => {
  it("should render table with 20 users", () => {
    render(
      <DataTable
        users={usersMock}
        headers={["ID", "First Name", "Last Name", "E-mail"]}
      />
    );

    const rows = screen.getAllByRole("row");

    expect(rows.length).toBe(usersMock.length + 1);
  });
});
