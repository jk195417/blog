---
title: 為 Ubuntu 18.04 LST 安裝 Tensorflow 1.12 with GPU support
date: 2019-03-12 21:03:09
toc: true
categories:
- 技術文章
tags:
- ubuntu
- tensorflow
- gpu
- cuda
---

執行完上一篇 {% post_link Install-Nvidia-GPU-driver-on-Ubuntu-18-04-LTS %} 後，就可以為我們的作業系統安裝能透過 GPU 運算的 TensorFlow 啦。

當前的 TensorFlow 版本為 1.12，只支援 CUDA 9.0，當前 CUDA 9.0 的 cuDNN 版本為 7.4.2。

# 安裝 CUDA

至 [https://developer.nvidia.com/cuda-90-download-archive](https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1704&target_type=runfilelocal) 下載安裝，選擇 `Linux`+`x86_64`+`Ubuntu+17.04`+`runfile(local)`，下載至 `~/下載/`，並透過下列指令執行：

```sh
sudo sh ~/下載/cuda_9.0.176_384.81_linux.run --override
```
Installing with an unsupported configuration 回答 `yes`

Install NVIDIA Accelerated Graphics Driver 回答 `no`

安裝完畢後將 CUDA 執行檔加入系統變數 `PATH` 中，在 `~/.bashrc` 或 `~/.zshrc` 中加入這兩行：

```sh
export PATH="$PATH:/usr/local/cuda-9.0/bin"
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/cuda/lib64"
```

<!-- more -->

# 安裝 cuDNN

到 [https://developer.nvidia.com/rdp/cudnn-download](https://developer.nvidia.com/rdp/cudnn-download)，選擇 `Download cuDNN v7.4.2 (Dec 14, 2018), for CUDA 9.0` 的 `cuDNN Library for Linux`，將檔案下載至 `~/下載/`：

```sh
# 解壓縮
tar -xzvf cudnn-9.0-linux-x64-v7.4.2.24.tgz
# 複製這些檔案到 CUDA 套件安裝處
sudo cp cuda/include/cudnn.h /usr/local/cuda-9.0/include
sudo cp cuda/lib64/libcudnn* /usr/local/cuda-9.0/lib64
# 給予所有使用者讀取的權限
sudo chmod a+r /usr/local/cuda-9.0/include/cudnn.h /usr/local/cuda-9.0/lib64/libcudnn*
```

# 安裝 libcupti

```sh
sudo apt-get install libcupti-dev
```

# 安裝 TensorFlow with GPU Support

```sh
# 建議啟用 venv
source ~/python3_virtual_environments/dcard_crawler/bin/activate
# 安裝 tensorflow
pip3 install --upgrade tensorflow-gpu
```

進入 python3 console 測試是否能執行：

```sh
# terminal
python3
```

```python3
# python3 console
from tensorflow.python.client import device_lib
device_lib.list_local_devices()
```
