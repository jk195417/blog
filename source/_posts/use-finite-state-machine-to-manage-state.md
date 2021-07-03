---
title: Use Finite-state Machine to manage state
date: 2021-07-03 11:00:05
thumbnail: use-finite-state-machine-to-manage-state/redux-lifecycle.png
categories:
  - 技術文章
tags:
  - state management
toc: true
---

## Introduction

Main Elements:

- States: must be limited
- Events
- Transitions: when `event 1` from `state A` to `state B`
- Actions: when `state|event|transition` changed then act `action`

<!-- more -->

{% asset_img finite-state-machine.png %}
from [https://en.wikipedia.org/wiki/Finite-state_machine](https://en.wikipedia.org/wiki/Finite-state_machine), Fig. 3

## Why We Need this

To make sure complex things never gone off the rails

- Add constraints on states, throw errors to avoid bad things
- Help to sort out reaction when state changed
- Code is documentation

## Different with Flux-like State Managements

Flux-like State Managements(Redux/MobX/NgRx) is a way to manage states by **utilizing  unidirectional data flows**, it is often to using this kind of state management with functional programming.

{% asset_img redux-lifecycle.png %}
Redux lifecycle, from [https://dev.to/radiumsharma06/abc-of-redux-5461](https://dev.to/radiumsharma06/abc-of-redux-5461), Fig. 1

It is easier to use FSM to manage state with object-oriented programming, but that did't mean you can't choose flux-like state management as your state management in object-oriented programming.

Actually, I kind of perfer using flux-like state management in morden frontend framework(React/Vue/Angular), because of these framework encourage you to use functional programming/unidirectional data flows.

Most of backend frameworks(Spring/Rails/Django/.NET) is develop by object-oriented programming languages, so using FSM to manage object state is totally reasonable.

## Libaries

For Ruby

- [https://github.com/aasm/aasm](https://github.com/aasm/aasm)

For JavaScript or TypeScript

- [https://github.com/davidkpiano/xstate](https://github.com/davidkpiano/xstate)

For C#

- [https://github.com/dotnet-state-machine/stateless](https://github.com/dotnet-state-machine/stateless)

## References

- [https://en.wikipedia.org/wiki/Finite-state_machine](https://en.wikipedia.org/wiki/Finite-state_machine)
- [https://github.com/aasm/aasm](https://github.com/aasm/aasm)
- [https://github.com/davidkpiano/xstate](https://github.com/davidkpiano/xstate)
- [https://github.com/dotnet-state-machine/stateless](https://github.com/dotnet-state-machine/stateless)
- [https://stackoverflow.com/a/54521035](https://stackoverflow.com/a/54521035)
- [https://medium.com/pm的生產力工具箱/如何有邏輯的釐清事物的狀態-f9fb59b15054](https://medium.com/pm%E7%9A%84%E7%94%9F%E7%94%A2%E5%8A%9B%E5%B7%A5%E5%85%B7%E7%AE%B1/%E5%A6%82%E4%BD%95%E6%9C%89%E9%82%8F%E8%BC%AF%E7%9A%84%E9%87%90%E6%B8%85%E4%BA%8B%E7%89%A9%E7%9A%84%E7%8B%80%E6%85%8B-f9fb59b15054)
- [https://facebook.github.io/flux/docs/in-depth-overview/](https://facebook.github.io/flux/docs/in-depth-overview/)
- [https://dev.to/radiumsharma06/abc-of-redux-5461](https://dev.to/radiumsharma06/abc-of-redux-5461)
