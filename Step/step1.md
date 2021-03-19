1 | 개발환경 구축
# 개발환경 구축
첫 튜토리얼인가요?
처음이나까 쉽게 해봅시다. 어떤걸 하던 개발환경 구축을 해야겠죠?!
OS 개발에는 크로스 컴파일러가 필요합니다.
### 필요한 이유
OS개발에 크로스 컴파일러가 필요하다고 했습니다. 왜 일까요?
한번만 생각해보면 쉽습니다. 컴파일러의 입장에서 컴파일 수행요청이 오면 지금 사용중인 컴파일 수행요청한 그 운영채제에서 실행된다고 생각합니다.
만약 그렇게 된다면 OS개발을 할때 분명 문제가 생길 것입니다.
### 빌드 준비
크로스 컴파일러는 Gcc를 수정하여 빌드해 만들것입니다.
이를 위해서는 
* GCC
* G++
* Make
* Bison
* Flex
* GMP
* MPFR
* MPC
* Texinfo  
등 많은 것들이 필요합니다. 각각 이게 무엇인지 정확히 알 필요는 없습니다. 
그냥 이런게 필요하구나. 정도로 생각해주세요.
[OSdev wiki](https://wiki.osdev.org/GCC_Cross-Compiler)에서 조금 페이지를 내려보면 아래와 같은 표가 보입니다.
![그림1-1](https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/file/image/image1-1.png)

영어로 되어 있는 것을 한글로 바꾼것을 봅시다.
|구분|소스코드|Debian환경|젠투리눅스|Fedora리눅스|Cygwin(윈도우)|OpenBSD|아치 리눅스|
|---|---|---|---|---|---|---|---|
|설치방법|...|sudo apt install ~|sudo emerge --ask ~|sudo dnf install ~|설치 프로그램|doas pkg_add ~|pacman -Syu ~|
|컴파일러|...|build-essential|sys-devel/gcc|gcc gcc-c++|mingw64-x86_64-gcc-g++ / mingw64-i686-gcc-g++|설치되어 있음|base-devel|
|Make|...|build-essential|sys-devel/make|make|make|설치되어 있음|base-devel|
|Bison|[[1]](https://ftp.gnu.org/gnu/bison/)|bison|sys-devel/bison|bison|bison|?|base-devel|
|Flex|[[2]](https://github.com/westes/flex/releases)|flex|sys-devel/flex|flex|flex|?|base-devel|
|GMP|[[3]](https://ftp.gnu.org/gnu/gmp/)|libgmp3-dev|dev-libs/gmp|gmp-devel|libgmp-devel|gmp|gmp|
|MPC|[[4]](https://ftp.gnu.org/gnu/mpc/)|libmpc-dev|dev-libs/mpc|libmpc-devel|	libmpc-devel|libmpc|libmpc|
|MPFR|[[5]](https://ftp.gnu.org/gnu/mpfr/)|libmpfr-dev|dev-libs/mpfr|mpfr-devel|libmpfr-devel|mpfr|mpfr|
|Texinfo|[[6]](https://ftp.gnu.org/gnu/texinfo/)|texinfo|sys-apps/texinfo|texinfo|texinfo|texinfo|base-devel|
|CLooG (설치안해도 됨)|[ClooG](http://www.cloog.org/)|libcloog-isl-dev|dev--libs/cloog|cloog-devel|libcloog-isl-devel|...|...|
|ISL|[[7]](http://isl.gforge.inria.fr/)|libisl-dev|dev-libs/isl|isl-devel|libisl-devel|...|...|

드디어 다 적었습니다. 위 표에 맞게 다운을 하면 돨것 같습니다. 
그리고 [GCC](https://www.gnu.org/software/gcc/)와 [Binutils](https://www.gnu.org/software/binutils/) 를 적절한 폴더에 추가해야합니다.
해당 튜토리얼에서는 윈도우만 다루도록 하겠습니다. 다른 운영체제에서의 개발환경 구축 내용은 [OSdev wiki](https://wiki.osdev.org/GCC_Cross-Compiler)를 참고해주세요.

### 빌드
##### Windows 10
<video muted autoplay loop>
  <source src="https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/file/video/windows_cross_build.mp4" type="video/mp4">
  <strong>Your browser does not support the video tag.</strong>
</video>
위 영상이나 아래 글을 참고해서 빌드해주세요.

먼저, cygwin을 설치해야 합니다. Cygwin은 리눅스와 같은 환경과 리눅스에서의 여러 패키지를 windows에서 설치할수 있도록 한 프로그램입니다.
[cygwin 설치](https://www.cygwin.com/install.html)해당 사이트로 접속하면 ![사진 1-2](https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/file/image/image1-2.png)
와 같은 화면이 뜹니다. 사진에서 위 쪽애 64/32비트로 나뉘어져 있습니다. 자신의 컴퓨터에 맞게 설치해주세요.
그후에 미러사이트 설정 전까지 다음을 눌러줍시다. 그후 미러사이트로 ftp://kr.freebsd.org/를 선택해줍시다.
그후 패키지 선택 화면에서 
```
gcc-core
gcc-g++
make
flex
bison
diffutils
libintl-devel
libgmp-devel
libmpfr-devel
libmpc-devel
texinfo
```
를 다운 받아 주세요.

---

설치가 다 되었다면 설치 path에 /usr/src에 [binutils](https://ftp.gnu.org/gnu/binutils/)와 [gcc](https://ftp.gnu.org/gnu/gcc/)를 압축해제 후 넣어주세요.
그후 cygwin terminal을 열어주시고
`export PREFIX="/usr/cross"` 또한 `export TARGET=i686-elf`를 해주세요.
그후 `cd /usr/src`로 폴더를 이동해주세요.
그리고 `mkdir build-binutils`를 해주세요. 
그후
```
../binutils-x.y.z/configure --target=$TARGET --prefix="$PREFIX" --with-sysroot --disable-nls --disable-werror
make
make install
```
를 한줄씩 실행해주면 binutils 빌드는 완료 되었습니다.
이제 Gcc를 빌드해 봅시다. GCC 빌드는 오래걸리니까 차분히 기다려 주세요.
```
cd /usr/src

which -- $TARGET-as || echo $TARGET-as is not in the PATH
 
mkdir build-gcc
cd build-gcc
../gcc-x.y.z/configure --target=$TARGET --prefix="$PREFIX" --disable-nls --enable-languages=c,c++ --without-headers
make all-gcc
make all-target-libgcc
make install-gcc
make install-target-libgcc
```
를 해주시면 GCC빌드또한 마무리 됩니다. 

---

마지막으로 /usr/cross 를 환경변수로 등록하면 됩니다.

---

## 참고 자료
1. https://wiki.osdev.org/GCC_Cross-Compiler
2. https://github.com/HIPERCUBE/64bit-Multicore-OS/blob/master/book/Windows.pdf

---
