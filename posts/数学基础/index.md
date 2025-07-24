# 数学基础


# 数学基础

# 向量

定义：有大小有方向的有向线段

## 向量的模长

$||v|| = \sqrt{v_x^2 + v_y^2}$

几何意义：

![](http://img.pondshadow.top//3415f1b5-e933-4c65-97a5-aeb30bc96600-20250713142925-m9465m5.png)

## 标准化向量

$\mathbf{v}_{norm} = \frac{\mathbf{v}}{||\mathbf{v}||}, \mathbf{v} \neq 0$

## 向量的加减法

$(a_x, a_y) + (b_x, b_y) = (a_x + b_x, a_y + b_y)$

几何意义：

![tmp3ABB-20250713142925-io8nt4n](http://img.pondshadow.top/tmp3ABB-20250713142925-io8nt4n-20250714153320-3vk2cix.png)

## 向量的点积

结果是一个标量，且满足交换律

$(a_x, a_y) \cdot (b_x, b_y) = a_x b_x + a_y b_y$

- 几何意义：投影长度

  $a \cdot b = |a||b|\cos\theta$

  点乘结果描述了两个向量的“相似”程度，点乘结果越大，夹角角度越小，两个向量越接近

  ![tmp47E8-20250713142925-mg66u98](assets/tmp47E8-20250713142925-mg66u98-20250714153326-zg9e1bx.png)

- 兰伯特光照模型（UE5）

  ![tmp87A5-20250713142925-uwdn2v6](http://img.pondshadow.top/tmp87A5-20250713142925-uwdn2v6-20250714153328-ecoralt.png)​

## 向量的叉积

结果是一个向量，且不满足交换律

$\begin{bmatrix} x_1 \\ y_1 \\ z_1 \end{bmatrix} \times \begin{bmatrix} x_2 \\ y_2 \\ z_2 \end{bmatrix} = \begin{bmatrix} y_1z_2 - z_1y_2 \\ z_1x_2 - x_1z_2 \\ x_1y_2 - y_1x_2 \end{bmatrix}$

几何意义：叉乘得到的向量垂直于原来的两个向量

![tmpDE87-20250713142925-n7pgaan](assets/tmpDE87-20250713142925-n7pgaan-20250714153335-74j9zw4.png)​

$\mathbf{a} \times \mathbf{b}| = |\mathbf{a}| \, |\mathbf{b}| \, \sin\theta$

# 矩阵

矩阵改变的是整个坐标系，即矩阵的每个列向量表示一个坐标轴

![矩阵变换.gif](assets/矩阵变换-20250713142925-0m0yx74.gif)​

## 特殊的矩阵

- 方阵：行列数相等
- 单位矩阵：从左到右的对角线上的元素是1，其余元素都为0
- 零矩阵：元素都是0的矩阵

## 矩阵的加减法

至于同型矩阵（行列数相同）才能相加减，且满足交换律和结合律

$\begin{bmatrix} 3 &amp; 5 \\ 1 &amp; 2 \end{bmatrix} + \begin{bmatrix} 1 &amp; 3 \\ 0 &amp; 4 \end{bmatrix} = \begin{bmatrix} 3+1 &amp; 5+3 \\ 1+0 &amp; 2+4 \end{bmatrix} = \begin{bmatrix} 4 &amp; 8 \\ 1 &amp; 6 \end{bmatrix}$

## 矩阵的数乘

$3 \times \begin{bmatrix} 1 &amp; 3 \\ 0 &amp; 4 \end{bmatrix} = \begin{bmatrix} 3*1 &amp; 3*3 \\ 3*0 &amp; 3*4 \end{bmatrix} = \begin{bmatrix} 3 &amp; 9 \\ 0 &amp; 12 \end{bmatrix}$

## 矩阵的乘法

m×n的矩阵只能和n×p的矩阵相乘，想乘后的大小为m×p

![tmpCE73-20250713142925-sayosjp](assets/tmpCE73-20250713142925-sayosjp.png)

### 运算规律

- 多个矩阵计算，从右向左
- 不满足交换律
- 数乘满足交换律：k(AB)=(kA)B=A(kB)
- 满足结合律：(AB)C=A(BC)
- 满足分配率：A(B+C)=AB+AC

### 矩阵乘法计算

![tmpE56D-20250713142925-xsg4nq3](assets/tmpE56D-20250713142925-xsg4nq3.png)​

### 几何意义

- 矩阵乘向量（2×1矩阵）：即该向量被矩阵坐标系所作用

  $\begin{bmatrix} \textcolor{forestgreen}{a} & \textcolor{tomato}{b} \\ \textcolor{forestgreen}{c} & \textcolor{tomato}{d} \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = x\begin{bmatrix} \textcolor{forestgreen}{a} \\ \textcolor{forestgreen}{c} \end{bmatrix} + y\begin{bmatrix} \textcolor{tomato}{b} \\ \textcolor{tomato}{d} \end{bmatrix} = \begin{bmatrix} \textcolor{forestgreen}{a}x + \textcolor{tomato}{b}y \\ \textcolor{forestgreen}{c}x + \textcolor{tomato}{d}y \end{bmatrix}$
- 矩阵乘矩阵：相继变换/复合变换

  $\overbrace{\textcolor{purple}{\begin{bmatrix} 0 & 2 \\ 1 & 0 \end{bmatrix}}}^{M_2} \overbrace{\textcolor{cyan}{\begin{bmatrix} \textcolor{green}{1} & \textcolor{orange}{-2} \\ \textcolor{green}{1} & \textcolor{orange}{0} \end{bmatrix}}}^{M_1} = \begin{bmatrix} 2 & ? \\ 1 & ? \end{bmatrix} \\[1em] \textcolor{purple}{\begin{bmatrix} 0 & 2 \\ 1 & 0 \end{bmatrix}} \textcolor{orange}{\begin{bmatrix} -2 \\ 0 \end{bmatrix}} = -2\textcolor{purple}{\begin{bmatrix} 0 \\ 1 \end{bmatrix}} + 0\textcolor{purple}{\begin{bmatrix} 2 \\ 0 \end{bmatrix}} = \begin{bmatrix} 0 \\ -2 \end{bmatrix}$
- 常用矩阵（配合矩阵变换原理理解）

  - 纵向拉伸矩阵

    $\begin{bmatrix} 1 & 0 \\ 0 & c \end{bmatrix}$
  - 斜切矩阵

    $\begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$
  - 基于y=x镜面对称

    $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$
  - 缩放矩阵

    $\begin{bmatrix} x & 0 \\ 0 & y \end{bmatrix}$
  - 旋转矩阵

    $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$

    推导：

    ![tmpBF36-20250713142925-y84b7a9](assets/tmpBF36-20250713142925-y84b7a9.png)​
  - 位移矩阵

    $\begin{bmatrix} 1 & 0 & x' \\ 0 & 1 & y \\ 0 & 0 & 1 \end{bmatrix}$

    位移矩阵不是线性变换，是仿射变换

    $\begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} x \\ y \\ 1 \end{bmatrix} = \begin{bmatrix} x + t_x \\ y + t_y \\ 1 \end{bmatrix}$

    > 齐次坐标表示下：（x，y，1）为点，（x，y，0）为向量
    >

## 三维空间中的坐标变换

- 缩放矩阵

  $\begin{bmatrix} x & 0 & 0 & 0 \\ 0 & y & 0 & 0 \\ 0 & 0 & z & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$

- 旋转矩阵

  - 绕x轴

    $\begin{bmatrix} 1 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; \cos\theta &amp; -\sin\theta &amp; 0 \\ 0 &amp; \sin\theta &amp; \cos\theta &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$
  - 绕y轴

    $\begin{bmatrix} \cos\theta &amp; 0 &amp; \sin\theta &amp; 0 \\ 0 &amp; 1 &amp; 0 &amp; 0 \\ -\sin\theta &amp; 0 &amp; \cos\theta &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$
  - 绕z轴

    $\begin{bmatrix} \cos\theta &amp; -\sin\theta &amp; 0 &amp; 0 \\ \sin\theta &amp; \cos\theta &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$

- 位移矩阵

  $\begin{bmatrix} 1 &amp; 0 &amp; 0 &amp; t_x \\ 0 &amp; 1 &amp; 0 &amp; t_y \\ 0 &amp; 0 &amp; 1 &amp; t_z \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$

## 矩阵的转置

把矩阵A的行换成同序数的列，该操作称为矩阵的转置运算

![fc96e561-50bf-43fe-a1a3-938298c12b1c.gif](assets/fc96e561-50bf-43fe-a1a3-938298c12b1c-20250713142925-p7tumon.gif)​

- 转置的性质

  - $\begin{aligned} (A^T)^T &= A \\ \end{aligned}$
  - $(A + B)^T = A^T + B^T$
  - $(AB)^T = B^T A^T$  

    ![eadc59a3-f201-4b25-ae44-beb0c6b965ca.gif](assets/eadc59a3-f201-4b25-ae44-beb0c6b965ca-20250713142925-au4ts7e.gif)​

    ![0c3199299be0de45e46d46e19fffa52d.jpg](assets/0c3199299be0de45e46d46e19fffa52d-20250713142925-v1pwz50.jpg)​

> 图形学中按行优先放置矩阵元素，而软件中可能为列优先，所以在操作前要先转置

## 矩阵的逆

$I = AA^{-1} = A^{-1}A$

矩阵与它的逆矩阵相乘，得到单位矩阵
常用作矩阵变换后再次矩阵变换回原来的初始位置

![tmp5466](assets/tmp5466-20250714153442-dpybj2z.png)​

![47b9f6a3603996f5b0794b861fd10f5b-20250713142925-z5lhi4k](assets/47b9f6a3603996f5b0794b861fd10f5b-20250713142925-z5lhi4k.jpg)​

逆矩阵的性质：

![tmp4900-20250713142925-2xshjb8](assets/tmp4900-20250713142925-2xshjb8.png)​

# MVP矩阵运算

![efa3985d-06e3-4de7-9b67-ad9a92f28a31-20250713142925-9j170nl](assets/efa3985d-06e3-4de7-9b67-ad9a92f28a31-20250713142925-9j170nl.png)​

> 坐标系规定，不同软件使用的坐标系是不同的（不同API的规定）
>
> ![tmpEC2A-20250713142925-x6oujil](assets/tmpEC2A-20250713142925-x6oujil.png)​

## M：模型空间→世界空间

对顶点进行缩放-旋转-平移（注意顺序不能变）

$\mathbf{M} = \begin{bmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} \cos\theta & 0 & \sin\theta & 0 \\ 0 & 1 & 0 & 0 \\ -\sin\theta & 0 & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} k_x & 0 & 0 & 0 \\ 0 & k_y & 0 & 0 \\ 0 & 0 & k_z & 0 \\ 0 & 0 & 0 & 1 \\ \end{bmatrix}$  

## V：世界空间→视觉空间

想象平移整个观察空间，让摄像机原点位于世界坐标的原点（坐标轴重合即可）

​​$V = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta & 0 \\ 0 & \sin\theta & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \\ \end{bmatrix}$  

> Unity 在模型空间和世界空间中选用的都是左手坐标系，而在观察空间中使用的是右手坐标系。这是符合 OpenGL 传统的，在这样的观察空间中，摄像机的正前方指向的是-z方向，所以要对z分量取反
>
> ![tmp99C5-20250713142925-k5n2onk](assets/tmp99C5-20250713142925-k5n2onk.png)​

## P：视觉空间→裁剪空间

完全位于这块空间内部的图元将会被保留，完全位于这块空间外部的图元将会被剔除，而与这块空间边界相交的图元就会被裁剪

![2a4a9137-734e-472e-9c89-2fc996a75089-20250713142925-6m3w0y9](assets/2a4a9137-734e-472e-9c89-2fc996a75089-20250713142925-6m3w0y9.png)​

> 投影矩阵的目的
>
> - 为投影做准备，真正的投影发生在后面的齐次除法(homogeneous division) 过程中而经过投影矩阵的变换后，顶点的w分量将会具有特殊的意义
> - 对x，y，z分量进行缩放，如果使用视锥体的6个裁剪平面来进行裁剪会比较麻烦，而经过投影矩阵的缩放后，我们可以直接使用w分量作为一个范围值，如果x，y，z分量都位于这个范围内，就说明该顶点位于裁剪空间内

### 透视投影

![fc777ac7-f0d1-4630-be8f-938c1918cd69-20250713142925-gb15n4p](assets/fc777ac7-f0d1-4630-be8f-938c1918cd69-20250713142925-gb15n4p.png)​

1. 求出视锥体的近裁剪平面和远裁剪平面的高度

    $\text{nearClipPlaneHeight} = 2 \cdot \text{Near} \cdot \tan\frac{\text{FOV}}{2}$  

    $\text{farClipPlaneHeight} = 2 \cdot \text{Far} \cdot \tan\frac{\text{FOV}}{2}$
2. 假设，当前摄像机的横纵比为 Aspect，则：

    $\text{Aspect} = \frac{\text{nearClipPlaneWidth}}{\text{nearClipPlaneHeight}}$  

    $\text{Aspect} = \frac{\text{farClipPlaneWidth}}{\text{farClipPlaneHeight}}$
3. 根据已知的Near、Far、FOV、Aspect的值来确定透视投影的投影矩阵

    $\mathbf{M}_{\text{frustum}} = \begin{bmatrix} \frac{\cot \frac{\text{FOV}}{2}}{\text{Aspect}} & 0 & 0 & 0 \\ 0 & \cot \frac{\text{FOV}}{2} & 0 & 0 \\ 0 & 0 & -\frac{\text{Far} + \text{Near}}{\text{Far} - \text{Near}} & -\frac{2 \cdot \text{Near} \cdot \text{Far}}{\text{Far} - \text{Near}} \\ 0 & 0 & -1 & 0 \\ \end{bmatrix}$  

    > 这是对于 OpenGL 的透视矩阵结果，因为OpenGL要求 w 的取值范围是 [-w，w] 但是对于DirectX这种图形接口，还需要对以上透视矩阵进行额外的处理，因为在 DirectX 窗口中要求的 w 的取值范围是 [0,w] ，为了保证NDC坐标正确落在规定范围内
    >

    - 推导过程

      ![019b55c9fc151107b99f4284650aadae.jpg](assets/019b55c9fc151107b99f4284650aadae-20250713142925-v542pp5.jpg)​
    - 顶点变换

      ![8ea17c24-04e5-4298-8f31-432a86712180-20250713142925-t7fnr33](assets/8ea17c24-04e5-4298-8f31-432a86712180-20250713142925-t7fnr33.png)​

      投影矩阵本质就是对x，y，z分量进行了不同程度的缩放，此时顶点的w分量不再是1，而是原先z分量的取反结果。现在，我们就可以按如下不等式来判断变换后的顶点是否位于视锥体内

      $\begin{aligned} -w &\leq x \leq w \\ -w &\leq y \leq w \\ -w &\leq z \leq w \end{aligned}$

      ![245f6fda-20bb-4ebb-9c19-bc823bbb6e35-20250713142925-ykqtbod](assets/245f6fda-20bb-4ebb-9c19-bc823bbb6e35-20250713142925-ykqtbod.png)​

      > 裁剪矩阵会改变空间的旋向性：空间从右手坐标系变换到了左手坐标系。这意味着，离摄像机越远，值将越大
      >

### 正交投影

![9d05cb89-5939-422a-a105-ddfe97fd624e-20250713142925-zvfjd1e](assets/9d05cb89-5939-422a-a105-ddfe97fd624e-20250713142925-zvfjd1e.png)​

1. 求出视锥体的近裁剪平面和远裁剪平面的高度

    $\begin{aligned} \text{nearClipPlaneHeight} &= 2 \cdot \text{Size}\\ \end{aligned}$  

    $\text{farClipPlaneHeight} = \text{nearClipPlaneHeight}$
2. 假设，当前摄像机的横纵比为 Aspect，则：

    $\text{nearClipPlaneWidth} = \text{Aspect} \cdot \text{nearClipPlaneHeight}$  

    $\text{farClipPlaneWidth} = \text{nearClipPlaneWidth}$
3. 根据已知的Near、Far、FOV、Aspect的值来确定透视投影的投影矩阵

    $\mathbf{M}_{\text{prtho}} = \begin{bmatrix} \frac{1}{\text{Aspect} \cdot \text{Size}} & 0 & 0 & 0 \\ 0 & \frac{1}{\text{Size}} & 0 & 0 \\ 0 & 0 & -\frac{2}{\text{Far} - \text{Near}} & -\frac{\text{Far} + \text{Near}}{\text{Far} - \text{Near}} \\ 0 & 0 & 0 & 1 \\ \end{bmatrix}$  

    > 这是对于 OpenGL 的透视矩阵结果，因为OpenGL要求 w 的取值范围是 [-w，w] 但是对于DirectX这种图形接口，还需要对以上透视矩阵进行额外的处理，因为在 DirectX 窗口中要求的 w 的取值范围是 [0,w] ，为了保证NDC坐标正确落在规定范围内
    >

    - 顶点变换

      ![f2d54b57-97b4-4107-958c-8d3c2e50f1d3-20250713142925-wmr7ozn](assets/f2d54b57-97b4-4107-958c-8d3c2e50f1d3-20250713142925-wmr7ozn.png)​

      现在，我们就可以按如下不等式来判断变换后的顶点是否位于视锥体内

      $\begin{aligned} -w &\leq x \leq w \\ -w &\leq y \leq w \\ -w &\leq z \leq w \end{aligned}$

      ![d5824f46-145a-429d-ba0f-89a17ffc4437-20250713142925-gvbqjeb](assets/d5824f46-145a-429d-ba0f-89a17ffc4437-20250713142925-gvbqjeb.png)​

      > 裁剪矩阵会改变空间的旋向性：空间从右手坐标系变换到了左手坐标系。这意味着，离摄像机越远，值将越大
      >

## 裁剪空间→屏幕空间

### 齐次除法

用齐次坐标系的w分量去除x、 y、 z分量。我们把这一步得到的坐标叫做归一化的设备坐标(Normalized Device Coordinates, NDC)

![tmpBC03-20250713142925-kwv6ff9](assets/tmpBC03-20250713142925-kwv6ff9.png)​

由于经过正交投影矩阵变换后的顶点的分量是 1, 因此齐次除法并不会对顶点的坐标产生影响

![tmp6AD2-20250713142925-12w3y0v](assets/tmp6AD2-20250713142925-12w3y0v.png)​

> 按照OpenGL的传统（如图），这个立方体的x、 y、 z分量的范围都是[-1, 1]，但在DirectX这样的API中，z分量的范围会是[0,1]

### 窗口映射

OpenGL屏幕空间左下角的像素坐标是(0,0)（DirectX是左上角），右上角的像素坐标是(pixelWidth, pixelHeight)，由于当前坐标都是[- 1, 1], 因此这个映射的过程就是一个缩放的过程

$\begin{aligned} \text{screen}_x &= \frac{\text{clip}_x \cdot \text{pixelWidth}}{2 \cdot \text{clip}_w} + \frac{\text{pixelWidth}}{2} \\ \text{screen}_y &= \frac{\text{clip}_y \cdot \text{pixelHeight}}{2 \cdot \text{clip}_w} + \frac{\text{pixelHeight}}{2} \end{aligned}$  

## 实际应用

- 世界空间的应用：不规则平面的Tingling，以世界空间坐标当做uv进行采样

  ![62da8d7d-1cf6-427d-8290-bdb8a188cf69-20250713142925-78d6g62](assets/62da8d7d-1cf6-427d-8290-bdb8a188cf69-20250713142925-78d6g62.png)​
- 视觉空间的应用：根据摄像机距离显隐变换的云朵

  ![347c4234-1a13-45b1-a3c2-eafc41a9eabc-20250713142925-bskwt3g](assets/347c4234-1a13-45b1-a3c2-eafc41a9eabc-20250713142925-bskwt3g.png)​

# 参考

- UE5兰伯特光照：[https://www.youtube.com/watch?v=4Y5eKDwZ4GY&amp;list=PL78XDi0TS4lGnGa7L2X4o3UV-XYZEKNwj&amp;index=2](https://www.youtube.com/watch?v=4Y5eKDwZ4GY&list=PL78XDi0TS4lGnGa7L2X4o3UV-XYZEKNwj&index=2)
- 矩阵相乘几何意义：[https://www.bilibili.com/video/BV1ms41167u9?spm_id_from=333.788.recommend_more_video.-1&amp;vd_source=c41d98ac8b5596b7a275fc197c54cded](https://www.bilibili.com/video/BV1ms41167u9?spm_id_from=333.788.recommend_more_video.-1&vd_source=c41d98ac8b5596b7a275fc197c54cded)
- 转置矩阵和逆矩阵的性质推导：[https://blog.csdn.net/yinhun2012/article/details/84236202](https://blog.csdn.net/yinhun2012/article/details/84236202)
- 《UnityShader入门精要》

‍


---

> 作者: 池边影  
> URL: https://pondshadow.github.io/posts/%E6%95%B0%E5%AD%A6%E5%9F%BA%E7%A1%80/  

