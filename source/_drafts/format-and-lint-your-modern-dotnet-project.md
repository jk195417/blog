---
title: format-and-lint-your-modern-dotnet-project
toc: true
thumbnail:
categories:
  - 技術文章
tags:
  - dotnet
  - formatter
  - linter
---

## Setup EditorConfig

We will pass the introduction of the editorconfig to you, please visit the [editorconfig.org][1] to learn more.

You can use sdk build-in template to generate `.editorconfig` file.

```bash
dotnet new editorconfig
```

Or use templates provide by [Dotnet-Boxed/Templates][2] and [RehanSaeed/EditorConfig][3], it will generate `.editorconfig` file with more rules included.

> Quotes from [RehanSaeed/EditorConfig][3]: A very generic .editorconfig file supporting .NET, C#, VB and web technologies.

```bash
dotnet new --install Boxed.Templates
dotnet new editorconf
```

## Setup dotnet-format

## (Optional) Setup CSharpier

## (Optional) Visual Studio Code Integration

## (Optional) CI Integration

## (Optional) Git Hooks Integration

## References

1. [editorconfig.org][1]
2. [Dotnet-Boxed/Templates][2]
3. [RehanSaeed/EditorConfig][3]

- [dotnet/format]
- [dotnet-format-commands]
- [csharpier.com]
- [belav/csharpier]

[1]: https://editorconfig.org/
[2]: https://github.com/Dotnet-Boxed/Templates
[3]: https://github.com/RehanSaeed/EditorConfig

[dotnet/format]: https://github.com/dotnet/format
[dotnet-format-commands]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-format
[csharpier.com]: https://csharpier.com/
[belav/csharpier]: https://github.com/belav/csharpier
