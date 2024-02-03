// test component HelloWorld
import { test, expect, it, describe } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";
import { mount } from "@vue/test-utils";

import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import { HelloWorld } from "#components";

test("Hello World", async () => {
  await renderSuspended(HelloWorld);
  expect(screen.getByText("Hello World")).toBeDefined();
});

describe("Hello World 2 by vite test", async () => {
  it("Component renders", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.vm).toBeTruthy();
  });
});
