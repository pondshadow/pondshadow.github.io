# 

<h1>数学基础</h1>
<h1>向量</h1>
<p>定义：有大小有方向的有向线段</p>
<h2>向量的模长</h2>
<p>$||v|| = \sqrt{v_x^2 + v_y^2}$</p>
<p>几何意义：</p>
<p><img src="http://img.pondshadow.top/3415f1b5-e933-4c65-97a5-aeb30bc96600-20250713142925-m9465m5.png" alt="3415f1b5-e933-4c65-97a5-aeb30bc96600-20250713142925-m9465m5" />​</p>
<h2>标准化向量</h2>
<p>$\mathbf{v}_{norm} = \frac{\mathbf{v}}{||\mathbf{v}||}, \mathbf{v} \neq 0$</p>
<h2>向量的加减法</h2>
<p>$(a_x, a_y) + (b_x, b_y) = (a_x + b_x, a_y + b_y)$</p>
<p>几何意义：</p>
<p><img src="http://127.0.0.1:52923/assets/tmp3ABB-20250713142925-io8nt4n-20250714153320-3vk2cix.png" alt="tmp3ABB-20250713142925-io8nt4n" /></p>
<h2>向量的点积</h2>
<p>结果是一个标量，且满足交换律</p>
<p>$(a_x, a_y) \cdot (b_x, b_y) = a_x b_x + a_y b_y$</p>
<ul>
<li>
<p>几何意义：投影长度</p>
<p>$a \cdot b = |a||b|\cos\theta$</p>
<p>点乘结果描述了两个向量的“相似”程度，点乘结果越大，夹角角度越小，两个向量越接近</p>
<p><img src="http://img.pondshadow.top/tmp47E8-20250713142925-mg66u98-20250714153326-zg9e1bx.png" alt="tmp47E8-20250713142925-mg66u98" /></p>
</li>
<li>
<p>兰伯特光照模型（UE5）</p>
<p><img src="http://img.pondshadow.top/tmp87A5-20250713142925-uwdn2v6-20250714153328-ecoralt.png" alt="tmp87A5-20250713142925-uwdn2v6" />​</p>
</li>
</ul>
<h2>向量的叉积</h2>
<p>结果是一个向量，且不满足交换律</p>
<p>$\begin{bmatrix} x_1 \\ y_1 \\ z_1 \end{bmatrix} \times \begin{bmatrix} x_2 \\ y_2 \\ z_2 \end{bmatrix} = \begin{bmatrix} y_1z_2 - z_1y_2 \\ z_1x_2 - x_1z_2 \\ x_1y_2 - y_1x_2 \end{bmatrix}$</p>
<p>几何意义：叉乘得到的向量垂直于原来的两个向量</p>
<p><img src="http://img.pondshadow.top/tmpDE87-20250713142925-n7pgaan-20250714153335-74j9zw4.png" alt="tmpDE87-20250713142925-n7pgaan" />​</p>
<p>$\mathbf{a} \times \mathbf{b}| = |\mathbf{a}| \, |\mathbf{b}| \, \sin\theta$</p>
<h1>矩阵</h1>
<p>矩阵改变的是整个坐标系，即矩阵的每个列向量表示一个坐标轴</p>
<p><img src="http://127.0.0.1:52923/assets/%E7%9F%A9%E9%98%B5%E5%8F%98%E6%8D%A2-20250713142925-0m0yx74.gif" alt="矩阵变换.gif" />​</p>
<h2>特殊的矩阵</h2>
<ul>
<li>方阵：行列数相等</li>
<li>单位矩阵：从左到右的对角线上的元素是1，其余元素都为0</li>
<li>零矩阵：元素都是0的矩阵</li>
</ul>
<h2>矩阵的加减法</h2>
<p>至于同型矩阵（行列数相同）才能相加减，且满足交换律和结合律</p>
<p>$\begin{bmatrix} 3 &amp; 5 \\ 1 &amp; 2 \end{bmatrix} + \begin{bmatrix} 1 &amp; 3 \\ 0 &amp; 4 \end{bmatrix} = \begin{bmatrix} 3+1 &amp; 5+3 \\ 1+0 &amp; 2+4 \end{bmatrix} = \begin{bmatrix} 4 &amp; 8 \\ 1 &amp; 6 \end{bmatrix}$</p>
<h2>矩阵的数乘</h2>
<p>$3 \times \begin{bmatrix} 1 &amp; 3 \ 0 &amp; 4 \end{bmatrix} = \begin{bmatrix} 3<em>1 &amp; 3</em>3 \ 3<em>0 &amp; 3</em>4 \end{bmatrix} = \begin{bmatrix} 3 &amp; 9 \ 0 &amp; 12 \end{bmatrix}$</p>
<h2>矩阵的乘法</h2>
<p>m×n的矩阵只能和n×p的矩阵相乘，想乘后的大小为m×p</p>
<p><img src="http://img.pondshadow.top/tmpCE73-20250713142925-sayosjp.png" alt="tmpCE73-20250713142925-sayosjp" /></p>
<h3>运算规律</h3>
<ul>
<li>多个矩阵计算，从右向左</li>
<li>不满足交换律</li>
<li>数乘满足交换律：k(AB)=(kA)B=A(kB)</li>
<li>满足结合律：(AB)C=A(BC)</li>
<li>满足分配率：A(B+C)=AB+AC</li>
</ul>
<h3>矩阵乘法计算</h3>
<p><img src="http://img.pondshadow.top/tmpE56D-20250713142925-xsg4nq3.png" alt="tmpE56D-20250713142925-xsg4nq3" />​</p>
<h3>几何意义</h3>
<ul>
<li>
<p>矩阵乘向量（2×1矩阵）：即该向量被矩阵坐标系所作用</p>
<p>$\begin{bmatrix} \textcolor{forestgreen}{a} & \textcolor{tomato}{b} \\ \textcolor{forestgreen}{c} & \textcolor{tomato}{d} \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = x\begin{bmatrix} \textcolor{forestgreen}{a} \\ \textcolor{forestgreen}{c} \end{bmatrix} + y\begin{bmatrix} \textcolor{tomato}{b} \\ \textcolor{tomato}{d} \end{bmatrix} = \begin{bmatrix} \textcolor{forestgreen}{a}x + \textcolor{tomato}{b}y \\ \textcolor{forestgreen}{c}x + \textcolor{tomato}{d}y \end{bmatrix}$</p>
</li>
<li>
<p>矩阵乘矩阵：相继变换/复合变换</p>
<p>$\overbrace{\textcolor{purple}{\begin{bmatrix} 0 & 2 \\ 1 & 0 \end{bmatrix}}}^{M_2} \overbrace{\textcolor{cyan}{\begin{bmatrix} \textcolor{green}{1} & \textcolor{orange}{-2} \\ \textcolor{green}{1} & \textcolor{orange}{0} \end{bmatrix}}}^{M_1} = \begin{bmatrix} 2 & ? \\ 1 & ? \end{bmatrix} \\[1em] \textcolor{purple}{\begin{bmatrix} 0 & 2 \\ 1 & 0 \end{bmatrix}} \textcolor{orange}{\begin{bmatrix} -2 \\ 0 \end{bmatrix}} = -2\textcolor{purple}{\begin{bmatrix} 0 \\ 1 \end{bmatrix}} + 0\textcolor{purple}{\begin{bmatrix} 2 \\ 0 \end{bmatrix}} = \begin{bmatrix} 0 \\ -2 \end{bmatrix}$</p>
</li>
<li>
<p>常用矩阵（配合矩阵变换原理理解）</p>
<ul>
<li>
<p>纵向拉伸矩阵</p>
<p>$\begin{bmatrix} 1 & 0 \\ 0 & c \end{bmatrix}$</p>
</li>
<li>
<p>斜切矩阵</p>
<p>$\begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$</p>
</li>
<li>
<p>基于y=x镜面对称</p>
<p>$\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$</p>
</li>
<li>
<p>缩放矩阵</p>
<p>$\begin{bmatrix} x & 0 \\ 0 & y \end{bmatrix}$</p>
</li>
<li>
<p>旋转矩阵</p>
<p>$\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$</p>
<p>推导：</p>
<p><img src="http://img.pondshadow.top/tmpBF36-20250713142925-y84b7a9.png" alt="tmpBF36-20250713142925-y84b7a9" />​</p>
</li>
<li>
<p>位移矩阵</p>
<p>$\begin{bmatrix} 1 & 0 & x' \\ 0 & 1 & y \\ 0 & 0 & 1 \end{bmatrix}$</p>
<p>位移矩阵不是线性变换，是仿射变换</p>
<p>$\begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} x \\ y \\ 1 \end{bmatrix} = \begin{bmatrix} x + t_x \\ y + t_y \\ 1 \end{bmatrix}$</p>
<blockquote>
<p>齐次坐标表示下：（x，y，1）为点，（x，y，0）为向量</p>
</blockquote>
</li>
</ul>
</li>
</ul>
<h2>三维空间中的坐标变换</h2>
<ul>
<li>
<p>缩放矩阵</p>
<p>$\begin{bmatrix} x & 0 & 0 & 0 \\ 0 & y & 0 & 0 \\ 0 & 0 & z & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$</p>
</li>
<li>
<p>旋转矩阵</p>
<ul>
<li>
<p>绕x轴</p>
<p>$\begin{bmatrix} 1 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; \cos\theta &amp; -\sin\theta &amp; 0 \\ 0 &amp; \sin\theta &amp; \cos\theta &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$</p>
</li>
<li>
<p>绕y轴</p>
<p>$\begin{bmatrix} \cos\theta &amp; 0 &amp; \sin\theta &amp; 0 \\ 0 &amp; 1 &amp; 0 &amp; 0 \\ -\sin\theta &amp; 0 &amp; \cos\theta &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$</p>
</li>
<li>
<p>绕z轴</p>
<p>$\begin{bmatrix} \cos\theta &amp; -\sin\theta &amp; 0 &amp; 0 \\ \sin\theta &amp; \cos\theta &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 0 \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$</p>
</li>
</ul>
</li>
<li>
<p>位移矩阵</p>
<p>$\begin{bmatrix} 1 &amp; 0 &amp; 0 &amp; t_x \\ 0 &amp; 1 &amp; 0 &amp; t_y \\ 0 &amp; 0 &amp; 1 &amp; t_z \\ 0 &amp; 0 &amp; 0 &amp; 1 \end{bmatrix}$</p>
</li>
</ul>
<h2>矩阵的转置</h2>
<p>把矩阵A的行换成同序数的列，该操作称为矩阵的转置运算</p>
<p><img src="http://127.0.0.1:52923/assets/fc96e561-50bf-43fe-a1a3-938298c12b1c-20250713142925-p7tumon.gif" alt="fc96e561-50bf-43fe-a1a3-938298c12b1c.gif" />​</p>
<ul>
<li>
<p>转置的性质</p>
<ul>
<li>
<p>$\begin{aligned} (A^T)^T &= A \\ \end{aligned}$</p>
</li>
<li>
<p>$(A + B)^T = A^T + B^T$</p>
</li>
<li>
<p>$(AB)^T = B^T A^T$</p>
<p><img src="http://127.0.0.1:52923/assets/eadc59a3-f201-4b25-ae44-beb0c6b965ca-20250713142925-au4ts7e.gif" alt="eadc59a3-f201-4b25-ae44-beb0c6b965ca.gif" />​</p>
<p><img src="http://127.0.0.1:52923/assets/0c3199299be0de45e46d46e19fffa52d-20250713142925-v1pwz50.jpg" alt="0c3199299be0de45e46d46e19fffa52d.jpg" />​</p>
</li>
</ul>
</li>
</ul>
<blockquote>
<p>图形学中按行优先放置矩阵元素，而软件中可能为列优先，所以在操作前要先转置</p>
</blockquote>
<h2>矩阵的逆</h2>
<p>$I = AA^{-1} = A^{-1}A$</p>
<p>矩阵与它的逆矩阵相乘，得到单位矩阵<br />
常用作矩阵变换后再次矩阵变换回原来的初始位置</p>
<p><img src="http://127.0.0.1:52923/assets/tmp5466-20250714153442-dpybj2z.png" alt="tmp5466" />​</p>
<p><img src="http://img.pondshadow.top/47b9f6a3603996f5b0794b861fd10f5b-20250713142925-z5lhi4k.jpg" alt="47b9f6a3603996f5b0794b861fd10f5b-20250713142925-z5lhi4k" />​</p>
<p>逆矩阵的性质：</p>
<p><img src="http://img.pondshadow.top/tmp4900-20250713142925-2xshjb8.png" alt="tmp4900-20250713142925-2xshjb8" />​</p>
<h1>MVP矩阵运算</h1>
<p><img src="http://img.pondshadow.top/efa3985d-06e3-4de7-9b67-ad9a92f28a31-20250713142925-9j170nl.png" alt="efa3985d-06e3-4de7-9b67-ad9a92f28a31-20250713142925-9j170nl" />​</p>
<blockquote>
<p>坐标系规定，不同软件使用的坐标系是不同的（不同API的规定）</p>
<p><img src="http://img.pondshadow.top/tmpEC2A-20250713142925-x6oujil.png" alt="tmpEC2A-20250713142925-x6oujil" />​</p>
</blockquote>
<h2>M：模型空间→世界空间</h2>
<p>对顶点进行缩放-旋转-平移（注意顺序不能变）</p>
<p>$\mathbf{M} = \begin{bmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} \cos\theta & 0 & \sin\theta & 0 \\ 0 & 1 & 0 & 0 \\ -\sin\theta & 0 & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} k_x & 0 & 0 & 0 \\ 0 & k_y & 0 & 0 \\ 0 & 0 & k_z & 0 \\ 0 & 0 & 0 & 1 \\ \end{bmatrix}$</p>
<h2>V：世界空间→视觉空间</h2>
<p>想象平移整个观察空间，让摄像机原点位于世界坐标的原点（坐标轴重合即可）</p>
<p>​​$V = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta & 0 \\ 0 & \sin\theta & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \\ \end{bmatrix}$</p>
<blockquote>
<p>Unity 在模型空间和世界空间中选用的都是左手坐标系，而在观察空间中使用的是右手坐标系。这是符合 OpenGL 传统的，在这样的观察空间中，摄像机的正前方指向的是-z方向，所以要对z分量取反</p>
<p><img src="http://img.pondshadow.top/tmp99C5-20250713142925-k5n2onk.png" alt="tmp99C5-20250713142925-k5n2onk" />​</p>
</blockquote>
<h2>P：视觉空间→裁剪空间</h2>
<p>完全位于这块空间内部的图元将会被保留，完全位于这块空间外部的图元将会被剔除，而与这块空间边界相交的图元就会被裁剪</p>
<p><img src="http://127.0.0.1:52923/assets/2a4a9137-734e-472e-9c89-2fc996a75089-20250713142925-6m3w0y9.png" alt="2a4a9137-734e-472e-9c89-2fc996a75089-20250713142925-6m3w0y9" />​</p>
<blockquote>
<p>投影矩阵的目的</p>
<ul>
<li>为投影做准备，真正的投影发生在后面的齐次除法(homogeneous division) 过程中而经过投影矩阵的变换后，顶点的w分量将会具有特殊的意义</li>
<li>对x，y，z分量进行缩放，如果使用视锥体的6个裁剪平面来进行裁剪会比较麻烦，而经过投影矩阵的缩放后，我们可以直接使用w分量作为一个范围值，如果x，y，z分量都位于这个范围内，就说明该顶点位于裁剪空间内</li>
</ul>
</blockquote>
<h3>透视投影</h3>
<p><img src="http://img.pondshadow.top/fc777ac7-f0d1-4630-be8f-938c1918cd69-20250713142925-gb15n4p.png" alt="fc777ac7-f0d1-4630-be8f-938c1918cd69-20250713142925-gb15n4p" />​</p>
<ol>
<li>
<p>求出视锥体的近裁剪平面和远裁剪平面的高度</p>
<p>$\text{nearClipPlaneHeight} = 2 \cdot \text{Near} \cdot \tan\frac{\text{FOV}}{2}$</p>
<p>$\text{farClipPlaneHeight} = 2 \cdot \text{Far} \cdot \tan\frac{\text{FOV}}{2}$</p>
</li>
<li>
<p>假设，当前摄像机的横纵比为 Aspect，则：</p>
<p>$\text{Aspect} = \frac{\text{nearClipPlaneWidth}}{\text{nearClipPlaneHeight}}$</p>
<p>$\text{Aspect} = \frac{\text{farClipPlaneWidth}}{\text{farClipPlaneHeight}}$</p>
</li>
<li>
<p>根据已知的Near、Far、FOV、Aspect的值来确定透视投影的投影矩阵</p>
<p>$\mathbf{M}_{\text{frustum}} = \begin{bmatrix} \frac{\cot \frac{\text{FOV}}{2}}{\text{Aspect}} & 0 & 0 & 0 \\ 0 & \cot \frac{\text{FOV}}{2} & 0 & 0 \\ 0 & 0 & -\frac{\text{Far} + \text{Near}}{\text{Far} - \text{Near}} & -\frac{2 \cdot \text{Near} \cdot \text{Far}}{\text{Far} - \text{Near}} \\ 0 & 0 & -1 & 0 \\ \end{bmatrix}$</p>
<blockquote>
<p>这是对于 OpenGL 的透视矩阵结果，因为OpenGL要求 w 的取值范围是 [-w，w] 但是对于DirectX这种图形接口，还需要对以上透视矩阵进行额外的处理，因为在 DirectX 窗口中要求的 w 的取值范围是 [0,w] ，为了保证NDC坐标正确落在规定范围内</p>
</blockquote>
<ul>
<li>
<p>推导过程</p>
<p><img src="http://127.0.0.1:52923/assets/019b55c9fc151107b99f4284650aadae-20250713142925-v542pp5.jpg" alt="019b55c9fc151107b99f4284650aadae.jpg" />​</p>
</li>
<li>
<p>顶点变换</p>
<p><img src="http://img.pondshadow.top/8ea17c24-04e5-4298-8f31-432a86712180-20250713142925-t7fnr33.png" alt="8ea17c24-04e5-4298-8f31-432a86712180-20250713142925-t7fnr33" />​</p>
<p>投影矩阵本质就是对x，y，z分量进行了不同程度的缩放，此时顶点的w分量不再是1，而是原先z分量的取反结果。现在，我们就可以按如下不等式来判断变换后的顶点是否位于视锥体内</p>
<p>$\begin{aligned} -w &\leq x \leq w \\ -w &\leq y \leq w \\ -w &\leq z \leq w \end{aligned}$</p>
<p><img src="http://127.0.0.1:52923/assets/245f6fda-20bb-4ebb-9c19-bc823bbb6e35-20250713142925-ykqtbod.png" alt="245f6fda-20bb-4ebb-9c19-bc823bbb6e35-20250713142925-ykqtbod" />​</p>
<blockquote>
<p>裁剪矩阵会改变空间的旋向性：空间从右手坐标系变换到了左手坐标系。这意味着，离摄像机越远，值将越大</p>
</blockquote>
</li>
</ul>
</li>
</ol>
<h3>正交投影</h3>
<p><img src="http://img.pondshadow.top/9d05cb89-5939-422a-a105-ddfe97fd624e-20250713142925-zvfjd1e.png" alt="9d05cb89-5939-422a-a105-ddfe97fd624e-20250713142925-zvfjd1e" />​</p>
<ol>
<li>
<p>求出视锥体的近裁剪平面和远裁剪平面的高度</p>
<p>$\begin{aligned} \text{nearClipPlaneHeight} &= 2 \cdot \text{Size}\\ \end{aligned}$</p>
<p>$\text{farClipPlaneHeight} = \text{nearClipPlaneHeight}$</p>
</li>
<li>
<p>假设，当前摄像机的横纵比为 Aspect，则：</p>
<p>$\text{nearClipPlaneWidth} = \text{Aspect} \cdot \text{nearClipPlaneHeight}$</p>
<p>$\text{farClipPlaneWidth} = \text{nearClipPlaneWidth}$</p>
</li>
<li>
<p>根据已知的Near、Far、FOV、Aspect的值来确定透视投影的投影矩阵</p>
<p>$\mathbf{M}_{\text{prtho}} = \begin{bmatrix} \frac{1}{\text{Aspect} \cdot \text{Size}} & 0 & 0 & 0 \\ 0 & \frac{1}{\text{Size}} & 0 & 0 \\ 0 & 0 & -\frac{2}{\text{Far} - \text{Near}} & -\frac{\text{Far} + \text{Near}}{\text{Far} - \text{Near}} \\ 0 & 0 & 0 & 1 \\ \end{bmatrix}$</p>
<blockquote>
<p>这是对于 OpenGL 的透视矩阵结果，因为OpenGL要求 w 的取值范围是 [-w，w] 但是对于DirectX这种图形接口，还需要对以上透视矩阵进行额外的处理，因为在 DirectX 窗口中要求的 w 的取值范围是 [0,w] ，为了保证NDC坐标正确落在规定范围内</p>
</blockquote>
<ul>
<li>
<p>顶点变换</p>
<p><img src="http://img.pondshadow.top/f2d54b57-97b4-4107-958c-8d3c2e50f1d3-20250713142925-wmr7ozn.png" alt="f2d54b57-97b4-4107-958c-8d3c2e50f1d3-20250713142925-wmr7ozn" />​</p>
<p>现在，我们就可以按如下不等式来判断变换后的顶点是否位于视锥体内</p>
<p>$\begin{aligned} -w &\leq x \leq w \\ -w &\leq y \leq w \\ -w &\leq z \leq w \end{aligned}$</p>
<p><img src="http://img.pondshadow.top/d5824f46-145a-429d-ba0f-89a17ffc4437-20250713142925-gvbqjeb.png" alt="d5824f46-145a-429d-ba0f-89a17ffc4437-20250713142925-gvbqjeb" />​</p>
<blockquote>
<p>裁剪矩阵会改变空间的旋向性：空间从右手坐标系变换到了左手坐标系。这意味着，离摄像机越远，值将越大</p>
</blockquote>
</li>
</ul>
</li>
</ol>
<h2>裁剪空间→屏幕空间</h2>
<h3>齐次除法</h3>
<p>用齐次坐标系的w分量去除x、 y、 z分量。我们把这一步得到的坐标叫做归一化的设备坐标(Normalized Device Coordinates, NDC)</p>
<p><img src="http://127.0.0.1:52923/assets/tmpBC03-20250713142925-kwv6ff9.png" alt="tmpBC03-20250713142925-kwv6ff9" />​</p>
<p>由于经过正交投影矩阵变换后的顶点的分量是 1, 因此齐次除法并不会对顶点的坐标产生影响</p>
<p><img src="http://img.pondshadow.top/tmp6AD2-20250713142925-12w3y0v.png" alt="tmp6AD2-20250713142925-12w3y0v" />​</p>
<blockquote>
<p>按照OpenGL的传统（如图），这个立方体的x、 y、 z分量的范围都是[-1, 1]，但在DirectX这样的API中，z分量的范围会是[0,1]</p>
</blockquote>
<h3>窗口映射</h3>
<p>OpenGL屏幕空间左下角的像素坐标是(0,0)（DirectX是左上角），右上角的像素坐标是(pixelWidth, pixelHeight)，由于当前坐标都是[- 1, 1], 因此这个映射的过程就是一个缩放的过程</p>
<p>$\begin{aligned} \text{screen}_x &= \frac{\text{clip}_x \cdot \text{pixelWidth}}{2 \cdot \text{clip}_w} + \frac{\text{pixelWidth}}{2} \\ \text{screen}_y &= \frac{\text{clip}_y \cdot \text{pixelHeight}}{2 \cdot \text{clip}_w} + \frac{\text{pixelHeight}}{2} \end{aligned}$</p>
<h2>实际应用</h2>
<ul>
<li>
<p>世界空间的应用：不规则平面的Tingling，以世界空间坐标当做uv进行采样</p>
<p><img src="http://img.pondshadow.top/62da8d7d-1cf6-427d-8290-bdb8a188cf69-20250713142925-78d6g62.png" alt="62da8d7d-1cf6-427d-8290-bdb8a188cf69-20250713142925-78d6g62" />​</p>
</li>
<li>
<p>视觉空间的应用：根据摄像机距离显隐变换的云朵</p>
<p><img src="http://img.pondshadow.top/347c4234-1a13-45b1-a3c2-eafc41a9eabc-20250713142925-bskwt3g.png" alt="347c4234-1a13-45b1-a3c2-eafc41a9eabc-20250713142925-bskwt3g" />​</p>
</li>
</ul>
<h1>参考</h1>
<ul>
<li>UE5兰伯特光照：<a href="https://www.youtube.com/watch?v=4Y5eKDwZ4GY&amp;list=PL78XDi0TS4lGnGa7L2X4o3UV-XYZEKNwj&amp;index=2">https://www.youtube.com/watch?v=4Y5eKDwZ4GY&amp;list=PL78XDi0TS4lGnGa7L2X4o3UV-XYZEKNwj&amp;index=2</a></li>
<li>矩阵相乘几何意义：<a href="https://www.bilibili.com/video/BV1ms41167u9?spm_id_from=333.788.recommend_more_video.-1&amp;vd_source=c41d98ac8b5596b7a275fc197c54cded">https://www.bilibili.com/video/BV1ms41167u9?spm_id_from=333.788.recommend_more_video.-1&amp;vd_source=c41d98ac8b5596b7a275fc197c54cded</a></li>
<li>转置矩阵和逆矩阵的性质推导：<a href="https://blog.csdn.net/yinhun2012/article/details/84236202">https://blog.csdn.net/yinhun2012/article/details/84236202</a></li>
<li>《UnityShader入门精要》</li>
</ul>
<p>‍</p>


---

> 作者: 池边影  
> URL: http://localhost:1313/posts/basics-of-mathematics-zgs2is/  

